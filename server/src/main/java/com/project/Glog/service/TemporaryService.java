package com.project.Glog.service;

import com.project.Glog.domain.Temporary;
import com.project.Glog.domain.TemporaryHashtag;
import com.project.Glog.dto.PostBasicDto;
import com.project.Glog.dto.response.post.PostTitleResponse;
import com.project.Glog.repository.TemporaryHashtagRepository;
import com.project.Glog.repository.TemporaryRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.util.AwsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TemporaryService {
    @Autowired
    private TemporaryRepository temporaryRepository;
    @Autowired
    private TemporaryHashtagRepository temporaryHashtagRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AwsUtils awsUtils;

    public PostTitleResponse readTemporaries(UserPrincipal userPrincipal){

        List<Temporary> temporaries = temporaryRepository.findByUserId(userPrincipal.getId());

        return new PostTitleResponse(temporaries);
    }


    public PostBasicDto readTemporaryDetail(UserPrincipal userPrincipal, Long temporaryId){
        Temporary temporary = temporaryRepository.findById(temporaryId).get();
        List<TemporaryHashtag> temporaryHashtags = temporaryHashtagRepository.findTemporaryHashtagsByTemporary(temporary);

        List<String> tags = temporaryHashtags.stream()
                .map(TemporaryHashtag::getTag) // 각 Hashtags 객체에서 tag 속성을 추출
                .collect(Collectors.toList());

        return PostBasicDto.of(temporary,tags);
    }

    public Temporary create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostBasicDto postBasicDto) throws IOException {
        Temporary temporary = new Temporary();

        temporary.setTitle(postBasicDto.getTitle());
        temporary.setContent(postBasicDto.getContent());

        if(!multipartFile.isEmpty())
            temporary.setThumbnail(awsUtils.upload(multipartFile, "thumbnail").getPath());
        temporary.setUser(userRepository.findById(userPrincipal.getId()).get());

        temporaryRepository.save(temporary);

        List<String> hashtags = postBasicDto.getHashtags();
        for(String hashtag :hashtags){
            TemporaryHashtag temporaryHashtag = new TemporaryHashtag();
            temporaryHashtag.setTag(hashtag);
            temporaryHashtag.setTemporary(temporary);
            temporaryHashtagRepository.save(temporaryHashtag);
        }

        return temporary;
    }

    public void delete(UserPrincipal userPrincipal, Long temporaryId) throws IllegalAccessException {
        Temporary temporary = temporaryRepository.findById(temporaryId).get();

        if(temporary.getUser().getId()!=userPrincipal.getId()){
            throw new IllegalAccessException("It's not your temporarypost");
        }
        else{
            temporaryRepository.delete(temporary);
        }
    }
}
