package com.project.Glog.controller;


import com.project.Glog.domain.Post;
import com.project.Glog.dto.PostPreviewDtos;
import com.project.Glog.dto.request.post.PostCreateRequest;
import com.project.Glog.dto.response.post.PostPreviewResponse;
import com.project.Glog.dto.response.post.PostReadResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.FriendService;
import com.project.Glog.service.PostService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private FriendService friendService;


    @RequestMapping(value = "/post",
            method = RequestMethod.POST,
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<Long> create(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestParam(value = "thumbnail", required = false) MultipartFile multipartFile,
                                       @RequestPart PostCreateRequest postCreateRequest) throws IOException {

        Post post = postService.create(userPrincipal, multipartFile, postCreateRequest);

        friendService.haveNewPost(userPrincipal, friendService.makeUserFriendResponse(userPrincipal));

        return new ResponseEntity<>(post.getId(), HttpStatus.OK);
    }

    @RequestMapping(value = "/post",
            method = RequestMethod.PUT,
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<Long> update(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestPart(value = "thumbnail", required = false) MultipartFile multipartFile,
                                       @RequestPart PostCreateRequest postCreateRequest) throws IOException {

        Post post = postService.update(userPrincipal, multipartFile, postCreateRequest);

        return new ResponseEntity<>(post.getId(), HttpStatus.OK);
    }

    @DeleteMapping("/post")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestParam Long postId) {

        try {
            postService.delete(userPrincipal, postId);
            return new ResponseEntity<>("success delete post", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }

    }

    @GetMapping("/post")
    public ResponseEntity<?> readPost(HttpServletRequest httpServletRequest,
                                      HttpServletResponse httpServletResponse,
                                      @CurrentUser UserPrincipal userPrincipal,
                                      @RequestParam Long postId) {

        try {
            Cookie cookie = postService.addViewCountByCookie(httpServletRequest, postId);
            httpServletResponse.addCookie(cookie);
            PostReadResponse postReadResponse = postService.readPost(userPrincipal, postId);
            return new ResponseEntity<>(postReadResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("no post", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/collect")
    public ResponseEntity<PostPreviewResponse> collect(@RequestParam int page) {

        PostPreviewResponse postPreviewResponse = postService.getCollect(page - 1);

        return new ResponseEntity<>(postPreviewResponse, HttpStatus.OK);
    }

    @GetMapping("/post/previews/{kind}")
    public ResponseEntity<PostPreviewDtos> collect(@PathVariable String kind,
                                                   @RequestParam int page) {

        PostPreviewDtos previews = postService.getPreviews(kind, page - 1);

        return new ResponseEntity<>(previews, HttpStatus.OK);
    }

    @GetMapping("/search/content")
    public ResponseEntity<PostPreviewDtos> searchContentsByContent(@RequestParam String content) {
        //content 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPostsByContent(content);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/search/hashtag")
    public ResponseEntity<PostPreviewDtos> searchContentsByHashtag(@RequestParam String hashtag) {
        //hashtag 내용을 포함한 게시글의 리스트를 생성한다
        PostPreviewDtos postPreviewDtos = postService.searchPostsByHashtag(hashtag);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/search/title")
    public ResponseEntity<PostPreviewDtos> searchContentsByTitle(@RequestParam String title) {
        //content 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPostsByTitle(title);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/search/user")
    public ResponseEntity<PostPreviewDtos> searchContentsByUser(@RequestParam String nickname) {
        //content 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPostsByUser(nickname);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<PostPreviewDtos> searchPost(@RequestParam(defaultValue = "content") String type ,@RequestParam(defaultValue = "") String value) {
        //content 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPost(type, value);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }

    @GetMapping("/search/category")
    public ResponseEntity<PostPreviewDtos> searchContentsByCategory(@RequestParam Long categoryId) {
        //content 내용을 포함한 게시글의 리스트를 생성한다.
        PostPreviewDtos postPreviewDtos = postService.searchPostsByCategory(categoryId);

        return new ResponseEntity<>(postPreviewDtos, HttpStatus.OK);
    }



    @PatchMapping("/post/like")
    public ResponseEntity<String> plusLike(@CurrentUser UserPrincipal userPrincipal,
                                           @RequestParam Long postId) {

        String result = postService.clickLike(userPrincipal, postId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

