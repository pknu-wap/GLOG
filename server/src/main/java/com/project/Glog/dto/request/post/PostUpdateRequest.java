package com.project.Glog.dto.request.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter @Setter
public class PostUpdateRequest {
    private Long postId;
    private String title;
    private String content;
    private Boolean isPrivate;
    private List<String> hashtags;

}