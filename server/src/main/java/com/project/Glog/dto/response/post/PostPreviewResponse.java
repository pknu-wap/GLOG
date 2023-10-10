package com.project.Glog.dto.response.post;

import com.project.Glog.dto.PostPreviewDtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class PostPreviewResponse {
    private PostPreviewDtos craeted;
    private PostPreviewDtos likes;
    private PostPreviewDtos views;
    private PostPreviewDtos randoms;

}
