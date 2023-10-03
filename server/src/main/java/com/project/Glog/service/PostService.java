package com.project.Glog.service;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PostLike;
import com.project.Glog.domain.User;
import com.project.Glog.dto.request.post.PostCreateRequest;
import com.project.Glog.dto.request.post.PostUpdateRequest;
import com.project.Glog.dto.responsee.post.PostPreviewDtos;
import com.project.Glog.dto.responsee.post.PostPreviewResponse;
import com.project.Glog.dto.responsee.post.PostReadResponse;
import com.project.Glog.repository.*;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.util.AwsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private AwsUtils awsUtils;

    public Post create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostCreateRequest postCreateRequest) throws IOException {
        Post post = postCreateRequest.toPost();
        post.setImageUrl(awsUtils.upload(multipartFile, "thumbnail").getPath());
        post.setUser(userRepository.findById(userPrincipal.getId()).get());
        post.setBlog(blogRepository.findByUserId(userPrincipal.getId()).get());
        post.setCategory(categoryRepository.findById(postCreateRequest.getCategoryId()).get());
        //형식상 예외처리 해야하나? 모르겠다
        return postRepository.save(post);
    }

    public Post update(UserPrincipal userPrincipal, PostUpdateRequest postUpdateRequest) {
        Post post = postRepository.findById(postUpdateRequest.getPostId()).get(); //예외처리 필요
        post.update(postUpdateRequest);
        return postRepository.save(post);
    }

    public void delete(UserPrincipal userPrincipal, Long postId) throws Exception{
        //사용자의 게시글이 맞는지 확인 아니면 예외 던짐
        Post post = postRepository.findById(postId).get();

        if(post.getUser().getId()!=userPrincipal.getId()){
            throw new IllegalAccessException("It's not your post");
        }
        else{
            postRepository.delete(post);
        }
    }

    public PostReadResponse readPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty()){
            throw new IllegalArgumentException("No Post");
        }
        else{
            return PostReadResponse.of(optionalPost.get());
        }
    }

    public PostPreviewResponse getPreviews(Long index) {
        PostPreviewDtos created = getCreatedPreviews(index*8);
        PostPreviewDtos views = getViewsPreviews(index*8);
        PostPreviewDtos likes = getLikesPreviews(index*8);
        PostPreviewDtos random = getRandomPreviews(index*8);
        //얘네 메서드도 페이지네이션 사용해서 처리하면 참 좋은데
        //중복되는 코드 리팩토링 필요

        return new PostPreviewResponse(created, likes, views, random);
    }

    private PostPreviewDtos getCreatedPreviews(Long cursor){
        List<Post> allCratedPosts = postRepository.findAllByOrderByIdDesc(); //posts 생성자
        List<Post> createdPosts = allCratedPosts.stream() //posts의 메서드로 실행
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(createdPosts);
    }
    public PostPreviewDtos getViewsPreviews(Long cursor){
        List<Post> allViewsPosts = postRepository.findAllByOrderByViewsDesc();
        List<Post> viewsPosts = allViewsPosts.stream()
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(viewsPosts);
    }
    public PostPreviewDtos getLikesPreviews(Long cursor){
        List<Post> allLikesPosts = postRepository.findAllByOrderByLikesDesc();
        List<Post> likesPosts = allLikesPosts.stream()
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(likesPosts);
    }
    public PostPreviewDtos getRandomPreviews(Long cursor){
        List<Post> allRandomPosts = postRepository.findAll();
        Collections.shuffle(allRandomPosts);
        List<Post> randomPosts = allRandomPosts.stream()
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(randomPosts);
    }

    public PostPreviewDtos searchPostsByContent(String content) {
        List<Post> posts = postRepository.findAllByContent(content);
        return new PostPreviewDtos(posts);
    }

    public PostPreviewDtos searchPostsByHashtag(String hashtag) {
        List<Post> posts = postRepository.findAllByHashtag(hashtag);
        return new PostPreviewDtos(posts);
    }

    public String clickLike(UserPrincipal userPrincipal, Long postId) {
        //TODO
        //로그인 당연히 되어 있을테니,
        //게시글 찾아오기
        //user 찾아오기

        //좋아요 DB에 사용자, 게시글 매칭되는 데이터 찾기
        //있으면
            //게시글 좋아요수 -1
            //좋아요 테이블에 데이터 삭제
            //"success removed like" 반환
        //없으면
            //게시글 +1
            //좋아요 테이블에 데이터 삽입
            //"success add like" 반환
        Post post = postRepository.findById(postId).get();
        User currentUser = userRepository.findById(userPrincipal.getId()).get();

        Optional<PostLike> postLikeOptional = postLikeRepository.findByReplyAndUser(post.getId(), currentUser.getId());
        if(postLikeOptional.isPresent()){
            post.setLikesCount(post.getLikesCount()-1);
            postRepository.save(post);

            postLikeRepository.delete(postLikeOptional.get());
            return "remove";
        }
        else{
            post.setLikesCount(post.getLikesCount()+1);
            postRepository.save(post);

            PostLike postLike = new PostLike(null,currentUser,post);
            postLikeRepository.save(postLike);
            return "add";

        return "";
    }
}
