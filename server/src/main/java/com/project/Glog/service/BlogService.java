package com.project.Glog.service;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.User;
import com.project.Glog.dto.request.user.UserCreateRequest;
import com.project.Glog.dto.responsee.blog.MyPageResponse;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
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

    public MyPageResponse changeBlogName(Long uid, String newBlogName){
        Blog blog = blogRepository.findByUserId(uid).get();
        blog.setBlogName(newBlogName);
        blogRepository.save(blog);
        return MyPageResponse.of(blog);
    }
    public String registerBlog(UserPrincipal userPrincipal, UserCreateRequest userCreateRequest){
        Blog blog = new Blog();
        blog.setUser(userRepository.findById(userPrincipal.getId()).get());
        blog.setBlogName(userCreateRequest.getBlogName());
        blog.setBlogUrl(userCreateRequest.getBlogUrl());

        User user = userRepository.findById(userPrincipal.getId()).get();
        user.setNickname(userCreateRequest.getNickname());

        blogRepository.save(blog);
        userRepository.save(user);

        return blog.getBlogUrl();
    }
}
