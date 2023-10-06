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

    @GetMapping("/scrap")
    public ResponseEntity<PostPreviewDtos> getScraps(@CurrentUser UserPrincipal userPrincipal,
                                                    @RequestParam int page){

        PostPreviewDtos postPreviewDtos = scrapService.getScrapPosts(userPrincipal, page);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }


    @PatchMapping("/scrap") //패치 메서드로 업데이트와 딜리트를 한번에 수행하는게 좋을듯
    public ResponseEntity<String> clickScrap(@CurrentUser UserPrincipal userPrincipal,
                                             @RequestParam Long postId){

        String result = scrapService.clickScrap(userPrincipal, postId);
        if(result.equals("add"))
            return new ResponseEntity<>("success add scrap",HttpStatus.OK);
        else
            return new ResponseEntity<>("success remove scrap",HttpStatus.OK);
    }

}
