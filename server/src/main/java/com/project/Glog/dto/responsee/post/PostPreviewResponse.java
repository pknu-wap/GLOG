package com.project.Glog.dto.responsee.post;

import com.project.Glog.dto.PostPreviewDtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class PostPreviewResponse { //TODO 네이밍 고려해봐야 함
    private PostPreviewDtos craeted;
    private PostPreviewDtos likes;
    private PostPreviewDtos views;
    private PostPreviewDtos randoms;

}
