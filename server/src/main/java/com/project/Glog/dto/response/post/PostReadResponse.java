package com.project.Glog.dto.response.post;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PostHashtag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    private List<String> hashtags;
    private LocalDateTime createdAt;

    public static PostReadResponse of(Post post) {
        List<String> hashtags = post.getHashtags().stream()
                .map(PostHashtag::getTag)
                .collect(Collectors.toList());

        return new PostReadResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getLikesCount(),
                post.getViewsCount(),
                hashtags,
                post.getCreatedAt());
    }

}




