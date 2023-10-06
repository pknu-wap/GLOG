package com.project.Glog.dto;


import com.project.Glog.domain.Temporary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostBasicDto {
    private Long Id;
    private String title;
    private String content;
    private String thumbnail;
    private String[] hashtags;
    public static PostBasicDto of (Temporary temporary, String[] hashtags){
        return new PostBasicDto(
                temporary.getId(),
                temporary.getTitle(),
                temporary.getContent(),
                temporary.getThumbnail(),
                hashtags);
    }
}
