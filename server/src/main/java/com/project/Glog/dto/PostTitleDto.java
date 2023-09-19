package com.project.Glog.dto;

import com.project.Glog.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class PostTitleDto {
    private Long postId;
    private String title;

    public static PostTitleDto of(Post post){
        return new PostTitleDto(post.getId(), post.getTitle());
    }
}
