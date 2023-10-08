package com.project.Glog.service;

import com.project.Glog.domain.*;
import com.project.Glog.dto.request.post.PostCreateRequest;
import com.project.Glog.dto.request.post.PostUpdateRequest;
import com.project.Glog.dto.PostPreviewDtos;
import com.project.Glog.dto.response.post.PostPreviewResponse;
import com.project.Glog.dto.response.post.PostReadResponse;
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
    private PostHashtagRepository postHashtagRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private AwsUtils awsUtils;

    public Post create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostCreateRequest req) throws IOException {
        User user = userRepository.findById(userPrincipal.getId()).get();
        Category category = categoryRepository.findById(req.getCategoryId()).get();
        Blog blog = blogRepository.findByUserId(userPrincipal.getId()).get();
        Post post = req.toPost(user, category, blog);

        //image
        if(!multipartFile.isEmpty())
            post.setImageUrl(awsUtils.upload(multipartFile, "thumbnail").getPath());

        //hashtags
        postRepository.save(post);
        setPostHashtag(post, req.getHashtags());

        return post;
    }

    public Post update(UserPrincipal userPrincipal, MultipartFile multipartFile, PostCreateRequest req) throws IOException{
        Post post = postRepository.findById(req.getPostId()).get();
        post.update(req);

        //image
        if(!multipartFile.isEmpty())
            post.setImageUrl(awsUtils.upload(multipartFile, "thumbnail").getPath());

        //hashtag 설정. 전부 삭제하고 다시 저장
        postHashtagRepository.deletePostHashtagsByPost(post);
        setPostHashtag(post, req.getHashtags());

        return postRepository.save(post);
    }

    public void delete(UserPrincipal userPrincipal, Long postId) throws Exception {
        //사용자의 게시글이 맞는지 확인 아니면 예외 던짐
        Post post = postRepository.findById(postId).get();

        if (post.getUser().getId() != userPrincipal.getId()) {
            throw new IllegalAccessException("It's not your post");
        } else {
            postRepository.delete(post);
        }
    }

    public PostReadResponse readPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new IllegalArgumentException("No Post");
        } else {
            return PostReadResponse.of(optionalPost.get());
        }
    }

    public PostPreviewResponse getPreviews(Long index) {
        PostPreviewDtos created = getCreatedPreviews(index * 8);
        PostPreviewDtos views = getViewsPreviews(index * 8);
        PostPreviewDtos likes = getLikesPreviews(index * 8);
        PostPreviewDtos random = getRandomPreviews(index * 8);
        //얘네 메서드도 페이지네이션 사용해서 처리하면 참 좋은데
        //중복되는 코드 리팩토링 필요

        return new PostPreviewResponse(created, likes, views, random);
    }

    private PostPreviewDtos getCreatedPreviews(Long cursor) {
        List<Post> allCratedPosts = postRepository.findAllByOrderByIdDesc(); //posts 생성자
        List<Post> createdPosts = allCratedPosts.stream() //posts의 메서드로 실행
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(createdPosts, allCratedPosts.size());
    }

    public PostPreviewDtos getViewsPreviews(Long cursor) {
        List<Post> allViewsPosts = postRepository.findAllByOrderByViewsDesc();
        List<Post> viewsPosts = allViewsPosts.stream()
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(viewsPosts, allViewsPosts.size());
    }

    public PostPreviewDtos getLikesPreviews(Long cursor) {
        List<Post> allLikesPosts = postRepository.findAllByOrderByLikesDesc();
        List<Post> likesPosts = allLikesPosts.stream()
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(likesPosts, allLikesPosts.size());
    }

    public PostPreviewDtos getRandomPreviews(Long cursor) {
        List<Post> allRandomPosts = postRepository.findAll();
        Collections.shuffle(allRandomPosts);
        List<Post> randomPosts = allRandomPosts.stream()
                .skip(cursor)
                .limit(8)
                .collect(Collectors.toList());

        return new PostPreviewDtos(randomPosts, allRandomPosts.size());
    }

    public PostPreviewDtos searchPostsByContent(String content) {
        List<Post> posts = postRepository.findAllByContent(content);
        return new PostPreviewDtos(posts, posts.size());
    }

    public PostPreviewDtos searchPostsByHashtag(String hashtag) {
        List<Post> posts = postRepository.findAllByHashtag(hashtag);
        return new PostPreviewDtos(posts, posts.size());
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
        if (postLikeOptional.isPresent()) {
            post.setLikesCount(post.getLikesCount() - 1);
            postRepository.save(post);

            postLikeRepository.delete(postLikeOptional.get());
            return "remove";
        } else {
            post.setLikesCount(post.getLikesCount() + 1);
            postRepository.save(post);

            PostLike postLike = new PostLike(null, currentUser, post);
            postLikeRepository.save(postLike);
            return "add";

        }
    }

    private void setPostHashtag(Post post, List<String> hashtagList){
        for(String hashtag :hashtagList){
            PostHashtag postHashtag = new PostHashtag();
            postHashtag.setTag(hashtag);
            postHashtag.setPost(post);
            postHashtagRepository.save(postHashtag);
        }
    }
}
