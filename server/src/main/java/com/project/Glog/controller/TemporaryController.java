package com.project.Glog.controller;

import com.project.Glog.dto.PostBasicDto;
import com.project.Glog.dto.response.post.PostTitleResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.TemporaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class TemporaryController {
    @Autowired
    private TemporaryService temporaryService;

    @GetMapping("/temporaries")
    public ResponseEntity<PostTitleResponse> readTemporary(@CurrentUser UserPrincipal userPrincipal){

        PostTitleResponse postTitleResponse = temporaryService.readTemporaries(userPrincipal);

        return new ResponseEntity<>(postTitleResponse, HttpStatus.OK);
    }

    @GetMapping("/temporary/detail")
    public ResponseEntity<PostBasicDto> readTemporaryDetail(@CurrentUser UserPrincipal userPrincipal,
                                                            @RequestParam("temporaryId") Long temporaryId){

        PostBasicDto postBasicDto = temporaryService.readTemporaryDetail(userPrincipal, temporaryId);

        return new ResponseEntity<>(postBasicDto,HttpStatus.OK);
    }


    @RequestMapping(value = "/temporary",
            method = RequestMethod.POST,
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<String> createTemporary(@CurrentUser UserPrincipal userPrincipal,
                                                  @RequestParam(value = "thumbnail", required = false) MultipartFile multipartFile,
                                                  @RequestPart PostBasicDto postBasicDto) throws IOException {

        temporaryService.create(userPrincipal, multipartFile, postBasicDto);

        return new ResponseEntity<>("success create temporary",HttpStatus.OK);
    }

    @DeleteMapping("/temporary")
    public ResponseEntity<String> deleteTemporary(@CurrentUser UserPrincipal userPrincipal,
                                                  @RequestParam Long temporaryId){

        try {
            temporaryService.delete(userPrincipal, temporaryId);

            return new ResponseEntity<>("success delete temporary",HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.FORBIDDEN);
        }

    }



}
