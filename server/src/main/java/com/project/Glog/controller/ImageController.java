package com.project.Glog.controller;

import com.project.Glog.util.AwsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageController {
    @Autowired
    private AwsUtils awsUtils;
    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestPart(value="image", required = true) MultipartFile multipartFile) throws IOException {
        String path = awsUtils.upload(multipartFile, "postImage").getPath();
        return new ResponseEntity<>(path, HttpStatus.OK);
    }
}
