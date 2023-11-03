package com.project.Glog.controller;

import com.project.Glog.dto.response.post.PostReadResponse;
import com.project.Glog.dto.response.pr.PrPostResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.PrPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrPostController {
    @Autowired
    private PrPostService prPostService;

    @GetMapping("/pr/posts/posted")
    public ResponseEntity<PrPostResponse> readPrPosted(@CurrentUser UserPrincipal userPrincipal, @RequestParam Long categoryId){
        PrPostResponse prPostResponse = prPostService.readPrPosted(userPrincipal, categoryId);

        return new ResponseEntity<>(prPostResponse, HttpStatus.OK);
    }
}
