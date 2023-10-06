package com.project.Glog.controller;

import com.project.Glog.dto.PostPreviewDtos;
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
    public ResponseEntity<PostPreviewDtos> getScaps(@CurrentUser UserPrincipal userPrincipal,
                                                    @RequestParam Integer page){

        PostPreviewDtos postPreviewDtos = scrapService.getScrapPosts(userPrincipal, page);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }


    @PostMapping("/scrap")
    public ResponseEntity<String> create(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestParam Long postId){

        scrapService.update(userPrincipal, postId);

        return new ResponseEntity<>("success add scrap",HttpStatus.OK);
    }


    @DeleteMapping("/scrap/post")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipa,
                                         @RequestParam Long postId){
        scrapService.delete(userPrincipa, postId);

        return new ResponseEntity<>("success delete scrap",HttpStatus.OK);
    }
}
