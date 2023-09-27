package com.project.Glog.controller;

import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class ReplyController {
    @Autowired
    private ReplyService replyService;


    @PostMapping("/replies")
    public ResponseEntity<Long> create(@CurrentUser UserPrincipal userPrincipal  ,
                                       @RequestBody ReplyCreateRequest replyCreateRequest) throws IOException {

        Long postId = replyService.createReply(userPrincipal, replyCreateRequest);

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }

    @GetMapping("/replies")
    public ResponseEntity<Long> read(@CurrentUser UserPrincipal userPrincipal ,
                                       @RequestBody ReplyGetRequest replyGetRequest) {

        ReplyGetResponse replyGetReponse = replyService.getReplies(userPrincipal, replyGetRequest);

        return new ResponseEntity<>(replyGetReponse, HttpStatus.OK);
    }

    @PutMapping("/replies")
    public ResponseEntity<String> update(@CurrentUser UserPrincipal userPrincipal ,
                                       @RequestBody ReplyUpdateRequest replyupdateRequest)  {

        Long postId = replyService.updateReply(userPrincipal, replyupdateRequest);

        return new ResponseEntity<>("success update reply", HttpStatus.OK);
    }

    @DeleteMapping("/replies")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipal ,
                                       @RequestParam Long replyId) {

        Long postId = replyService.deleteReply(userPrincipal, replyId);

        return new ResponseEntity<>("success delete reply", HttpStatus.OK);
    }

    @PatchMapping("/replies/like")
    public ResponseEntity<String> create(@CurrentUser UserPrincipal userPrincipal  ,
                                       @RequestParam Long replyId) throws IOException {

        Long postId = replyService.clickLike(userPrincipal, replyId);

        return new ResponseEntity<>("success add like", HttpStatus.OK);
    }
}
