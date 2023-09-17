package com.project.Glog.controller;


import com.project.Glog.domain.Post;
import com.project.Glog.dto.PostPreviewDtos;
import com.project.Glog.dto.request.post.PostCreateRequest;
import com.project.Glog.dto.request.post.PostUpdateRequest;
import com.project.Glog.dto.responsee.post.PostPreviewResponse;
import com.project.Glog.dto.responsee.post.PostReadResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PostController {
    @Autowired
    private PostService postService;


    @PostMapping("/post/create")
    public ResponseEntity<Long> create(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestPart(value = "thumbnail", required = false) MultipartFile multipartFile,
                                       @RequestPart PostCreateRequest postCreateRequest) throws IOException {

        Post post = postService.create(userPrincipal, postCreateRequest);

        return new ResponseEntity<>(post.getId(), HttpStatus.OK);
    }

    @PostMapping("/post/update")
    public ResponseEntity<Long> update(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestPart(value="thumbnail", required = false) MultipartFile multipartFile,
                                       @RequestPart PostUpdateRequest postUpdateRequest) throws IOException {

        //TODO GetMapping으로 따로 파야할듯
        //해당 유저의 게시글인지 판단하는 로직은 백엔드 컨트롤러 에서 이루어 져야 한다.

        //해당 유저의 게시글이라면 업데이트 해서 돌려줌
        Post post = postService.update(userPrincipal, postUpdateRequest);

        return new ResponseEntity<>(post.getId(), HttpStatus.OK);
    }

    @DeleteMapping ("/post/{postId}")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestParam Long postId){

        try {
            postService.delete(userPrincipal, postId);
            return new ResponseEntity<>("success delete",HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.FORBIDDEN);
        }

    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostReadResponse> readPost(@PathVariable Long postId){
        //인증 필요 없음

        PostReadResponse postReadResponse = postService.readPost(postId);

        return new ResponseEntity<>(postReadResponse, HttpStatus.OK);
    }

    @GetMapping("/main")
    public ResponseEntity<PostPreviewResponse> main(Long index){
        //TODO
        // 페이지네이션 공부해서 사용해보는 것도 괜찮을듯
        // 이 페이지는 인증 안해도됨. SecurityConfig 수정 필요
        PostPreviewResponse postPreviewResponse = postService.getPreviews(index);

        return new ResponseEntity<>(postPreviewResponse,HttpStatus.OK);
    }

    @GetMapping("/search/post/content")
    public ResponseEntity<PostPreviewDtos> searchContentsByString(@RequestParam String content){
        //content 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPostsByContent(content);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/search/post/hashtag")
    public ResponseEntity<PostPreviewDtos> searchContentsByHashtag(@RequestParam String hashtag){
        //hashtag 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPostsByHashtag(hashtag);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}/like")
    public ResponseEntity<String> plusLike(@CurrentUser UserPrincipal userPrincipal,
                                            @PathVariable Long postId){

        String result = postService.clickLike(userPrincipal, postId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

