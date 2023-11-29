package com.project.Glog.service;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Category;
import com.project.Glog.domain.History;
import com.project.Glog.domain.Post;
import com.project.Glog.domain.PostHashtag;
import com.project.Glog.domain.PostLike;
import com.project.Glog.domain.PrPost;
import com.project.Glog.domain.User;
import com.project.Glog.dto.PostPreviewDtos;
import com.project.Glog.dto.request.post.PostCreateRequest;
import com.project.Glog.dto.response.post.PostPreviewResponse;
import com.project.Glog.dto.response.post.PostReadResponse;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.CategoryRepository;
import com.project.Glog.repository.HistoryRepository;
import com.project.Glog.repository.PostHashtagRepository;
import com.project.Glog.repository.PostLikeRepository;
import com.project.Glog.repository.PostRepository;
import com.project.Glog.repository.PrPostRepository;
import com.project.Glog.repository.ScrapRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.util.AwsUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class PostService {
    private static final String VIEW_COOKIE_NAME = "view_Count";

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
    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private PrPostRepository prPostRepository;


    public Post create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostCreateRequest req) throws IOException {
        User user = userRepository.findById(userPrincipal.getId()).get();
        Blog blog = blogRepository.findByUserId(userPrincipal.getId()).get();
        Post post;


        if (req.getPrId() != null) {
            PrPost prPost = prPostRepository.findPrByPrId(req.getPrId()).get();
            Category ct = prPost.getCategory();
            post = req.toPost(user, ct, blog);
            post.setPrPost(prPost);
            post.setIsPr(true);
            prPost.setIsPosted(true);
            prPost.setPost(post);
            postRepository.save(post);
            prPostRepository.save(prPost);
        } else {
            Category category = categoryRepository.findById(req.getCategoryId()).get();
            post = req.toPost(user, category, blog);
            post.setIsPr(false);
            postRepository.save(post);
        }
        //image
        if (!multipartFile.isEmpty())
            post.setThumbnail(awsUtils.upload(multipartFile, "thumbnail").getPath());

        //hashtags

        setPostHashtag(post, req.getHashtags());


        // 발자국 저장 로직
        History history = new History();
        history.setUser(user);
        LocalDate localDate = LocalDate.now();

        History repositoryHistory = historyRepository.findByDate(user.getId(), localDate);

        if (repositoryHistory == null) {
            history.setCount(1);
            historyRepository.save(history);
        } else {
            if (repositoryHistory.getCount() < 3) {
                repositoryHistory.setCount(repositoryHistory.getCount() + 1);
            }
            historyRepository.save(repositoryHistory);
        }

        return post;
    }

    public Post update(UserPrincipal userPrincipal, MultipartFile multipartFile, PostCreateRequest req) throws IOException {
        Post post = postRepository.findById(req.getPostId()).get();
        post.update(req);

        //image
        if (!multipartFile.isEmpty())
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

    public PostReadResponse readPost(UserPrincipal userPrincipal, Long postId) throws Exception {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new IllegalArgumentException("no post");
        } else {
            Post post = optionalPost.get();
            Boolean isScraped = false;
            Boolean isLiked = false;
            Boolean isAuthor = false;

            if (userPrincipal != null) {
                User user = userRepository.findById(userPrincipal.getId()).get();

                if (scrapRepository.findByUserIdAndPostId(user.getId(), post.getId()).isPresent())
                    isScraped = true;

                if (postLikeRepository.findByPostAndUser(post.getId(), user.getId()).isPresent())
                    isLiked = true;

                if (post.getUser().equals(user))
                    isAuthor = true;
            }

            PostReadResponse res = PostReadResponse.of(post);
            res.setIsScraped(isScraped);
            res.setIsLiked(isLiked);
            res.setIsAuthor(isAuthor);
            return res;
        }
    }

    public Cookie addViewCountByCookie(HttpServletRequest request, Long postId) {
        Cookie[] cookies = request.getCookies();
        Cookie oldCookie = this.findCookie(cookies, VIEW_COOKIE_NAME);

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + postId + "]")) {
                oldCookie.setValue(oldCookie.getValue() + "[" + postId + "]");
                oldCookie.setPath("/");
                addViewCount(postId);
            }
            return oldCookie;
        }

        Cookie newCookie = new Cookie(VIEW_COOKIE_NAME, "[" + postId + "]");
        newCookie.setPath("/");
        addViewCount(postId);
        return newCookie;
    }

    private Cookie findCookie(Cookie[] cookies, String name) {
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equalsIgnoreCase(name)) {
                    return cookie;
                }
            }
        }
        return null;
    }

    private void addViewCount(Long postId) {
        Post post = postRepository.findById(postId).get();
        post.addCount();
        postRepository.save(post);
    }

    public PostPreviewResponse getCollect(int page) {
        PostPreviewDtos created = getPreviews("recent", page);
        PostPreviewDtos likes = getPreviews("likes", page);
        PostPreviewDtos views = getPreviews("views", page);
        PostPreviewDtos random = new PostPreviewDtos(postRepository.findPostsByRandom(), 0);

        return new PostPreviewResponse(created, likes, views, random);
    }

    public PostPreviewDtos getPreviews(String kind, int page) {
        if (!kind.equals("randoms")) {
            PageRequest pageRequest = null;

            if (kind.equals("recent")) {
                pageRequest = PageRequest.of(page, 8, Sort.by("id").descending());
            } else if (kind.equals("likes")) {
                pageRequest = PageRequest.of(page, 8, Sort.by("likesCount").descending());
            } else if (kind.equals("views")) {
                pageRequest = PageRequest.of(page, 8, Sort.by("viewsCount").descending());
            }

            Page<Post> postsByPagination = postRepository.findByisPrivate(false,pageRequest);
            return new PostPreviewDtos(postsByPagination.getContent(), postsByPagination.getTotalPages());
        } else if (kind.equals("randoms")) {
            List<Post> posts = postRepository.findPostsByRandom();
            return new PostPreviewDtos(posts, 0);
        }
        return null;
    }

    public PostPreviewDtos searchPostsByContent(String content) {
        List<Post> posts = postRepository.findAllByContentContaining(content);
        return new PostPreviewDtos(posts, posts.size());
    }

    public PostPreviewDtos searchPostsByHashtag(String hashtag) {
        List<PostHashtag> postHashtags = postHashtagRepository.findAllByTagContaining(hashtag);
        List<Post> posts = new ArrayList<>();
        for (PostHashtag tag : postHashtags) {
            posts.add(tag.getPost());
        }
        return new PostPreviewDtos(posts, posts.size());
    }

    public PostPreviewDtos searchPostsByTitle(String title) {
        List<Post> posts = postRepository.findAllByTitleContaining(title);
        return new PostPreviewDtos(posts, posts.size());
    }

    public PostPreviewDtos searchPostsByUser(String nickname) {
        User user = userRepository.findUserByNickname(nickname);
        List<Post> posts = postRepository.findAllByUser(user);
        return new PostPreviewDtos(posts, posts.size());
    }

    public PostPreviewDtos searchPost(String type ,String value){
        PostPreviewDtos postPreviewDtos;
        if(type.equals("user")){
            postPreviewDtos = searchPostsByUser(value);
        }
        else if(type.equals("title")){
            postPreviewDtos = searchPostsByTitle(value);
        }
        else if(type.equals("hashtag")){
            postPreviewDtos = searchPostsByHashtag(value);
        }
        else{
            postPreviewDtos = searchPostsByContent(value);
        }

        return postPreviewDtos;
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

    public PostPreviewDtos searchPostsByCategory(Long categoryId, int page) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        PageRequest pageRequest = PageRequest.of(page, 8,  Sort.by("id").descending());
        Page<Post> posts = postRepository.findPostsByCategory(category, pageRequest);

        return new PostPreviewDtos(posts.getContent(), -1);
    }

    private void setPostHashtag(Post post, List<String> hashtagList) {
        for (String hashtag : hashtagList) {
            PostHashtag postHashtag = new PostHashtag();
            postHashtag.setTag(hashtag);
            postHashtag.setPost(post);
            postHashtagRepository.save(postHashtag);
        }
    }
}
