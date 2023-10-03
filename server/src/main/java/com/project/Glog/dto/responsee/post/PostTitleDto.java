package com.project.Glog.dto.responsee.post;

import com.project.Glog.domain.Temporary;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PostTitleDto {
    private Long Id;
    private String title;

    public static PostTitleDto of (Temporary temporary){
        return new PostTitleDto(temporary.getId(),
                temporary.getTitle());
    }
}