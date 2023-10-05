package com.project.Glog.controller;

import com.project.Glog.dto.responsee.post.PostPreviewDtos;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.ScrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ScrapController {

    @Autowired
    private ScrapService scrapService;

    @GetMapping("/scrap/posts")
    public ResponseEntity<PostPreviewDtos> getScaps(@CurrentUser UserPrincipal userPrincipa,
                                                    @RequestParam Integer page){

        PostPreviewDtos postPreviewDtos = scrapService.getScrapPosts(userPrincipa, page);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }


    @PostMapping("/scrap")
    public ResponseEntity<String> update(@CurrentUser UserPrincipal userPrincipa,
                                         @RequestParam Long postId){

        scrapService.update(userPrincipa, postId);

        return new ResponseEntity<>("success add scrap",HttpStatus.OK);
    }


    @DeleteMapping("/scrap/post")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipa,
                                         @RequestParam Long postId){
        scrapService.delete(userPrincipa, postId);

        return new ResponseEntity<>("success delete scrap",HttpStatus.OK);
    }
}
