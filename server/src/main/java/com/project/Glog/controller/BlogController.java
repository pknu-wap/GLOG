package com.project.Glog.controller;

import com.project.Glog.dto.request.user.UserCreateRequest;
import com.project.Glog.dto.responsee.blog.MyPageResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class BlogController {
    @Autowired
    private BlogService blogService;


    //TODO 기능 대부분을 User에 넘길지 고려해봐야 함
    @GetMapping("/mypage")
    public ResponseEntity<MyPageResponse> goToMypage(@CurrentUser UserPrincipal userPrincipal){

        MyPageResponse myPageResponse = blogService.getMypage(userPrincipal.getId());

        return new ResponseEntity<>(myPageResponse, HttpStatus.OK);
    }

    @PostMapping("/change/blog/name")
    public ResponseEntity<MyPageResponse> changeBlogName(@CurrentUser UserPrincipal userPrincipal,
                                                         @RequestParam String newBlogName){

        MyPageResponse myPageResponse = blogService.changeBlogName(userPrincipal.getId(), newBlogName);

        return new ResponseEntity<>(myPageResponse, HttpStatus.OK);
    }

    //TODO 스킨도 사용자마다 적용되는거라 유저 서비스로 넣어야 하나?
//    @PostMapping("/mypage/change/blog/skin")
//    public ResponseEntity<MyPageResponse> changeBlogSkin(@CurrentUser UserPrincipal userPrincipal,
//                                                         @RequestBody Integer blogSkin) {
//
//        MyPageResponse myPageResponse = blogService.changeBlogSkin(userPrincipal, blogSkin);
//
//        return new ResponseEntity<>(myPageResponse, HttpStatus.OK);
//    }
    @PostMapping("/create/blog")
    public ResponseEntity<String> createBlog(@CurrentUser UserPrincipal userPrincipal,
                                             @RequestBody UserCreateRequest userCreateRequest){
        //UserCreateRequest를 받아서 정보를 저장한다.
        String blogUrl = blogService.registerBlog(userPrincipal, userCreateRequest);

        return new ResponseEntity<>(blogUrl, HttpStatus.OK);
    }
}
