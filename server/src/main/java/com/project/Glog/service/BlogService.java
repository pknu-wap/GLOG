package com.project.Glog.service;

import com.project.Glog.domain.User;
import com.project.Glog.dto.responsee.blog.MyPageResponse;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;

    public MyPageResponse getMypage(Long uid){
        return MyPageResponse.of(blogRepository.findByUserId(uid).get());
    }

}
