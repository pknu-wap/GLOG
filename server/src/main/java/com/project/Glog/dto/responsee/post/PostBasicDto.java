package com.project.Glog.dto.responsee.post;


import com.project.Glog.domain.Temporary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Getter
@Setter
public class PostBasicDto {
    private Long Id;
    private String title;
    private String content;
    private String thumbnail;
    private String[] hashtags;
    public static PostBasicDto of (Temporary temporary, String[] hashtag){
        return new PostBasicDto(temporary.getId(),
                temporary.getTitle(),
                temporary.getContent(),
                temporary.getThumbnail(),
                hashtag);
    }
}
