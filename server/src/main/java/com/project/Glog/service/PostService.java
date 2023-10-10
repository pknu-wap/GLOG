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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    private ScrapRepository scrapRepository;
    @Autowired
    private AwsUtils awsUtils;

    public Post create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostCreateRequest req) throws IOException {
        User user = userRepository.findById(userPrincipal.getId()).get();
        Category category = categoryRepository.findById(req.getCategoryId()).get();
        Blog blog = blogRepository.findByUserId(userPrincipal.getId()).get();
        Post post = req.toPost(user, category, blog);

        //image
        if(!multipartFile.isEmpty())
            post.setThumbnail(awsUtils.upload(multipartFile, "thumbnail").getPath());

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
            post.setThumbnail(awsUtils.upload(multipartFile, "thumbnail").getPath());

        postRepository.save(post);

        //hashtag 설정. 전부 삭제하고 다시 저장
        postHashtagRepository.deletePostHashtagsByPost(post);
        setPostHashtag(post, req.getHashtags());

        return post;
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

    public PostReadResponse readPost(UserPrincipal userPrincipal, Long postId) throws Exception{
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new IllegalArgumentException("no post");
        }
        else {
            Post post = optionalPost.get();
            Boolean isScraped = false;
            Boolean isLiked = false;
            Boolean isAuthor = false;

            if(userPrincipal!=null){
                User user = userRepository.findById(userPrincipal.getId()).get();

                if(scrapRepository.findByUserIdAndPostId(user.getId(),post.getId()).isPresent())
                    isScraped = true;

                if(postLikeRepository.findByPostAndUser(post.getId(), user.getId()).isPresent())
                    isLiked = true;

                if(post.getUser().equals(user))
                    isAuthor = true;
            }

            PostReadResponse res = PostReadResponse.of(post);
            res.setIsScraped(isScraped);
            res.setIsLiked(isLiked);
            res.setIsAuthor(isAuthor);

            return res;
        }
    }

    public PostPreviewResponse getCollect(int page) {
        PostPreviewDtos created = getPreviews("recent", page);
        PostPreviewDtos likes = getPreviews("likes", page);
        PostPreviewDtos views = getPreviews("views", page);
        PostPreviewDtos random = new PostPreviewDtos(postRepository.findPostsByRandom(), 0);

        return new PostPreviewResponse(created, likes, views, random);
    }

    public PostPreviewDtos getPreviews(String kind, int page){
        if (!kind.equals("randoms")){
            PageRequest pageRequest=null;
            if(kind.equals("recent")){
                pageRequest = PageRequest.of(page, 8, Sort.by("id").descending());
            }
            else if(kind.equals("likes")){
                pageRequest = PageRequest.of(page, 8, Sort.by("likesCount").descending());
            }
            else if(kind.equals("views")){
                pageRequest = PageRequest.of(page, 8, Sort.by("viewsCount").descending());
            }
            Page<Post> postsByPagination = postRepository.findAll(pageRequest);
            return new PostPreviewDtos(postsByPagination.getContent(), postsByPagination.getTotalPages());
        }
        else if(kind.equals("randoms")){
            List<Post> posts = postRepository.findPostsByRandom();
            return new PostPreviewDtos(posts, 0);
        }
        return null;
    }

    public PostPreviewDtos searchPostsByContent(String content) {
        List<Post> posts = postRepository.findAllByContent(content);
        return new PostPreviewDtos(posts, posts.size());
    }

    public PostPreviewDtos searchPostsByHashtag(String hashtag) {
        List<Post> posts = postRepository.findAllByHashtag(hashtag); //TODO 수정 필요
        return new PostPreviewDtos(posts, posts.size());
    }

    public String clickLike(UserPrincipal userPrincipal, Long postId) {

        Post post = postRepository.findById(postId).get();
        User currentUser = userRepository.findById(userPrincipal.getId()).get();

        Optional<PostLike> postLikeOptional = postLikeRepository.findByPostAndUser(post.getId(), currentUser.getId());
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
