package com.project.Glog.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.project.Glog.dto.AwsS3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class AwsUtils {

    @Autowired
    private AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    //MultipartFile 객체를 File 객체로 변환
    //반환 값은 가공된 key, path값을 가지는 AwsS3객체
    public AwsS3 upload(MultipartFile multipartFile, String dirName) throws IOException {
        File file = convertMultipartFileToFile(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        return upload(file, dirName);
    }

    private AwsS3 upload(File file, String dirName) {
        String key = randomFileName(file, dirName);
        String path = putS3(file, key);
        removeFile(file);

        return new AwsS3(key, path);
    }

    //파일명이 중복되면 안되고, 특정 디렉토리에 데이터를 넣기위해
    //폴더 + 랜덤 문자열 + 파일명 = 새로운 파일 이름
    //반환값은 생성된 파일의 이름 = key값
    private String randomFileName(File file, String dirName) {
        return dirName + "/" + UUID.randomUUID() + file.getName();
    }

    //컨버터한 파일을 S3에 직접 저장하는 메서드
    //반환값은 저장한 파일의 경로
    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return getS3(bucket, fileName);
    }

    //버킷과 파일명을 주면 url을 가져옴
    private String getS3(String bucket, String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeFile(File file) {
        file.delete();
    }

    public Optional<File> convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());

        if (file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)){
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(file);
        }
        return Optional.empty();
    }

    public void remove(AwsS3 awsS3) {
        if (!amazonS3.doesObjectExist(bucket, awsS3.getKey())) {
            throw new AmazonS3Exception("Object " +awsS3.getKey()+ " does not exist!");
        }
        amazonS3.deleteObject(bucket, awsS3.getKey());
    }
}