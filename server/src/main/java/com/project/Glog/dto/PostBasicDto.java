package com.project.Glog.dto;


import com.project.Glog.domain.TemplateTemporary;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostBasicDto {
    private Long Id;
    private String title;
    private String content;
    private String thumbnail;
    private List<String> hashtags; //TODO 리스트로 주고 받는게 편할듯?
    
    public static <T extends TemplateTemporary> PostBasicDto of(T templateTemporary, List<String> hashtags) {
        return new PostBasicDto(
                templateTemporary.getId(),
                templateTemporary.getTitle(),
                templateTemporary.getContent(),
                templateTemporary.getThumbnail(),
                hashtags);
    }
}
