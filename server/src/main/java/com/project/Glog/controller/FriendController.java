package com.project.Glog.controller;

import com.project.Glog.dto.response.user.UserFriendResponse;
import com.project.Glog.dto.response.user.UserModalResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FriendController {
    @Autowired
    private FriendService friendService;

    @PutMapping("/friend")
    public ResponseEntity<UserModalResponse> requestFriend(@CurrentUser UserPrincipal userPrincipal,
                                                           @RequestParam Long userId) {
        friendService.addFriend(userPrincipal, userId);
        UserModalResponse userModalResponse = friendService.makeUserModalResponse(userPrincipal, userId);

        return new ResponseEntity<>(userModalResponse, HttpStatus.OK);
    }

    @GetMapping("/friend/read")
    public ResponseEntity<String> readFriendPost(@CurrentUser UserPrincipal userPrincipal,
                                                 @RequestParam Long userId) {

        friendService.readPost(userPrincipal, userId);
        return new ResponseEntity<>("success read friend's post", HttpStatus.OK);
    }

    @DeleteMapping("/friend")
    public ResponseEntity<String> deleteFriend(@CurrentUser UserPrincipal userPrincipal,
                                               @RequestParam Long userId) {

        friendService.deleteFriend(userPrincipal, userId);

        return new ResponseEntity<>("success cancel friend", HttpStatus.OK);
    }

    @GetMapping("/friend/{kind}")
    public ResponseEntity<UserFriendResponse> readFriendList(@CurrentUser UserPrincipal userPrincipal,
                                                             @PathVariable String kind) {
        UserFriendResponse userFriendResponseByKind = friendService.sortUserFriendResponse(userPrincipal, kind);
        return new ResponseEntity<>(userFriendResponseByKind, HttpStatus.OK);
    }

    @GetMapping("/search/friend/name")
    public ResponseEntity<UserFriendResponse> searchFriendByName(@CurrentUser UserPrincipal userPrincipal,
                                                                 @RequestParam String name) {
        UserFriendResponse userFriendResponseByName = friendService.searchFriendByName(userPrincipal, name);

        return new ResponseEntity<>(userFriendResponseByName, HttpStatus.OK);
    }

    @PutMapping("/friend/allow")
    public ResponseEntity<UserFriendResponse> allowFriendRequest(@CurrentUser UserPrincipal userPrincipal,
                                                                 @RequestParam int isAccept,
                                                                 @RequestParam Long userId) {
        if (isAccept == 0) {
            friendService.allowFriend(userPrincipal, userId);
        }
        if (isAccept == 1) {
            friendService.refuseFriend(userPrincipal, userId);
        }
        UserFriendResponse userFriendResponse = friendService.makeUserFriendResponse(userPrincipal);
        return new ResponseEntity<>(userFriendResponse, HttpStatus.OK);
    }
}
