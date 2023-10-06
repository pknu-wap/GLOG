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

        Optional<TemporaryHashtag> temporaryHashtag = temporaryHashtagRepository.findByTemporaryId(temporaryId);
        Optional<Temporary> optionalTemporary = temporaryRepository.findById(temporaryId);

        List<String> hashtag = temporaryHashtag.map(value -> {   // temporaryId 값을 이용하여 해당 임시저장 해시태그 값을 가져와서 리스트로 저장
            List<String> list = new ArrayList<>();
            list.add(String.valueOf(value));
            return list;
        }).orElse(new ArrayList<>());

        String[] hashtags = hashtag.stream()   //TODO 리스트에서 배열로 바꾸는 것이 아니라 바로 배열로 생성 하는게 좋지 않을까?
                .toArray(String[]::new);


        if(optionalTemporary.isEmpty()){
            throw new IllegalArgumentException("No Temporary Post");
        }
        else{
            return PostBasicDto.of(optionalTemporary.get(), hashtags);
        }
    }

    public Temporary create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostBasicDto postBasicDto) throws IOException {
        Temporary temporary = new Temporary();

        temporary.setTitle(postBasicDto.getTitle());
        temporary.setContent(postBasicDto.getContent());

        temporary.setUser(userRepository.findById(userPrincipal.getId()).get());
        temporary.setThumbnail(awsUtils.upload(multipartFile, "thumbnail").getPath());

        String[] hashtags = postBasicDto.getHashtags();
        for(String hashtag :hashtags){
            TemporaryHashtag temporaryHashtag = new TemporaryHashtag();
            temporaryHashtag.setTag(hashtag);
            temporaryHashtag.setTemporary(temporary);
            temporaryHashtagRepository.save(temporaryHashtag);
        }

        return temporaryRepository.save(temporary);
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
