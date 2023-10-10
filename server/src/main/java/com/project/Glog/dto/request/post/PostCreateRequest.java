package com.project.Glog.dto.request.post;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Category;
import com.project.Glog.domain.Post;
import com.project.Glog.domain.User;
import com.project.Glog.security.UserPrincipal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.util.List;

@AllArgsConstructor
@Getter @Setter
public class PostCreateRequest {
    private Long postId;
    private String title;
    private String content;
    private Boolean isPrivate;
    private Boolean isPr;
    private Long categoryId;
    private List<String> hashtags;

    public Post toPost(User user, Category category, Blog blog){
        Post post = new Post();
        post.setUser(user);
        post.setCategory(category);
        post.setBlog(blog);
        post.setTitle(title);
        post.setContent(content);
        post.setBlogUrl(blog.getBlogUrl());
        post.setLikesCount(0);
        post.setViewsCount(0);
        post.setIsPrivate(isPrivate);
        post.setIsPr(isPr);
        return post;
    }
}