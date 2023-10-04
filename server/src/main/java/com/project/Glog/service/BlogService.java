package com.project.Glog.service;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.User;
import com.project.Glog.dto.request.user.UserCreateRequest;
import com.project.Glog.dto.responsee.blog.MyPageResponse;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    /*public String registerBlog(UserPrincipal userPrincipal, UserCreateRequest userCreateRequest){
        Blog blog = new Blog();
        User user = userRepository.findById(userPrincipal.getId()).get();

        blog.setUser(user);
        blog.setBlogName(userCreateRequest.getBlogName());
        blog.setBlogUrl(userCreateRequest.getBlogUrl());
        user.setNickname(userCreateRequest.getNickname());

        blogRepository.save(blog);
        userRepository.save(user);

        return blog.getBlogUrl();
    }*/
    @Transactional
    public String registerBlogAndSetUserNickname(UserPrincipal userPrincipal, UserCreateRequest userCreateRequest){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(()->new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        Blog blog = new Blog(user,
                userCreateRequest.getBlogUrl(),
                userCreateRequest.getBlogName());
        user.setNickname(userCreateRequest.getNickname());
        blogRepository.save(blog);

        return blog.getBlogUrl();
    }
}
