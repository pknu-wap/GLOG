package com.project.Glog.dto.response.post;

import com.project.Glog.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class PostReadResponse {
    private Long postId;
    private String title;
    private String content;
    private String imageUrl;
    private Integer likesCount;
    private Integer viewsCount;
    private String hashtags;
    private LocalDateTime createdAt;

    public static PostReadResponse of(Post post) {
        return new PostReadResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getLikesCount(),
                post.getViewsCount(),
                post.getHashtags(),
                post.getCreatedAt());
    }

}




