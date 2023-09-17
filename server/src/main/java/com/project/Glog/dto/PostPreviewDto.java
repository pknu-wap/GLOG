package com.project.Glog.dto;

import com.project.Glog.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class PostPreviewDto {
    private Long postId;
    private String title;
    private String content;
    private String imageUrl;
    private Integer likesCount;
    private Integer viewsCount;
    private String hashtags;

    //TODO 어떤 정보 보여줄지 기억이 안남 API 명세 작성 필요.

    public static PostPreviewDto of (Post post){
        return new PostPreviewDto(post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getLikesCount(),
                post.getViewsCount(),
                post.getHashtags());
    }
}
