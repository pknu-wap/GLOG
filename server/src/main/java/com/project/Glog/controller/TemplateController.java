package com.project.Glog.controller;

import com.project.Glog.dto.PostBasicDto;
import com.project.Glog.dto.response.post.PostTitleResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class TemplateController {
    @Autowired
    private TemplateService templateService;

    @GetMapping("/template")
    public ResponseEntity<PostTitleResponse> readTemplate(@CurrentUser UserPrincipal userPrincipal) {
        PostTitleResponse postTitleResponse = templateService.readTemplates(userPrincipal);

        return new ResponseEntity<>(postTitleResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/template",
            method = RequestMethod.POST,
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<String> createTemplate(@CurrentUser UserPrincipal userPrincipal,
                                                 @RequestParam(value = "thumbnail", required = false) MultipartFile multipartFile,
                                                 @RequestPart PostBasicDto postBasicDto) throws IOException {

        templateService.create(userPrincipal, multipartFile, postBasicDto);

        return new ResponseEntity<>("success create template", HttpStatus.OK);
    }

    @GetMapping("/template/detail")
    public ResponseEntity<PostBasicDto> readTemplateDetail(@CurrentUser UserPrincipal userPrincipal,
                                                           @RequestParam("templateId") Long templateId) {

        PostBasicDto postBasicDto = templateService.readTemplateDetail(userPrincipal, templateId);

        return new ResponseEntity<>(postBasicDto, HttpStatus.OK);
    }

    @DeleteMapping("/template")
    public ResponseEntity<String> deleteTemplate(@CurrentUser UserPrincipal userPrincipal,
                                                 @RequestParam Long templateId) {

        try {
            templateService.delete(userPrincipal, templateId);

            return new ResponseEntity<>("success delete temporary", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }

    }
}
