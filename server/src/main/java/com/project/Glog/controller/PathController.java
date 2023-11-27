package com.project.Glog.controller;

import com.project.Glog.dto.PathDto;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.PathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PathController {
    @Autowired
    private PathService pathService;

    @GetMapping("/path")
    public ResponseEntity<List<PathDto>> readPath(@CurrentUser UserPrincipal userPrincipal) {

        List<PathDto> pathDtos = pathService.makePathDtos(userPrincipal);

        return new ResponseEntity<>(pathDtos, HttpStatus.OK);
    }

    @PostMapping("/path")
    public ResponseEntity<String> savePath(@RequestParam String path, @RequestParam Long blogId) {

        pathService.savePath(path, blogId);

        return new ResponseEntity<>("success save path", HttpStatus.OK);
    }
}
