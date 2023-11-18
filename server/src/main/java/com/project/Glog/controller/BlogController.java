package com.project.Glog.controller;

import com.project.Glog.dto.request.user.UserCreateRequest;
import com.project.Glog.dto.response.blog.MyPageResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/blog")
    public ResponseEntity<String> createBlog(@CurrentUser UserPrincipal userPrincipal,
                                             @RequestBody UserCreateRequest userCreateRequest){
        //UserCreateRequest를 받아서 정보를 저장한다.
        String blogUrl = blogService.registerBlog(userPrincipal, userCreateRequest);

        return new ResponseEntity<>(blogUrl, HttpStatus.OK);
    }

    @GetMapping("/blogid")
    public ResponseEntity<Long> getBlogId(@RequestParam String blogUrl){
        Long blogId = blogService.getBlogId(blogUrl);
        return new ResponseEntity<>(blogId, HttpStatus.OK);
    }

    @GetMapping("/read-me")
    public ResponseEntity<String> readReadme(@RequestParam Long blogId){

        String readme = blogService.getReadme(blogId);

        return new ResponseEntity<>(readme, HttpStatus.OK);
    }

    @PutMapping("/read-me")
    public ResponseEntity<String> putReadme(@CurrentUser UserPrincipal userPrincipal,
                                            @RequestBody String readme){
        blogService.registerReadme(userPrincipal, readme);

        return new ResponseEntity<>("success update read-me", HttpStatus.OK);
    }
}
