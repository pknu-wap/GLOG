package com.project.Glog.controller;

import com.project.Glog.dto.request.user.UserInfoChangeRequest;
import com.project.Glog.dto.response.user.UserDetailResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.CustomUserDetailsService;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UserController {

    @Autowired
    private CustomUserDetailsService userService;

//    @GetMapping("/user/me")
//    @PreAuthorize("hasRole('USER')")
//    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
//        return userRepository.findById(userPrincipal.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
//    }

    //쪼개서 요청해도 되는데 일단 한번에
    @PostMapping("/change/user/info")
    public ResponseEntity<UserDetailResponse> chageUserInfo(@CurrentUser UserPrincipal userPrincipal,
                                                            @RequestBody UserInfoChangeRequest userInfoChangeRequest) {

        UserDetailResponse userDto = userService.changeUserInfo(userPrincipal.getId(), userInfoChangeRequest);

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }


    @PostMapping("/change/user/image")
    public ResponseEntity<UserDetailResponse> chageUserImage(@CurrentUser UserPrincipal userPrincipal,
                                                             @RequestPart(value="image") MultipartFile multipartFile) throws IOException {

        UserDetailResponse userDto = userService.changeUserImage(userPrincipal.getId(), multipartFile);

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}
