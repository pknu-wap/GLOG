package com.project.Glog.controller;

import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.VisitService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitController {
    @Autowired
    private VisitService visitService;

    @GetMapping("/visit")
    public ResponseEntity<Integer> readVisitCount(@CurrentUser UserPrincipal userPrincipal) {

        int visitCount = visitService.getVisitCount(userPrincipal.getId());

        return new ResponseEntity<>(visitCount, HttpStatus.OK);
    }

    @PostMapping("/visit")
    public ResponseEntity<Cookie> saveVisitCount(HttpServletRequest request,
                                                 @RequestParam Long blogId) {

        Cookie cookie = visitService.addVisitCountByCookie(request, blogId);

        return new ResponseEntity<>(cookie, HttpStatus.OK);
    }
}
