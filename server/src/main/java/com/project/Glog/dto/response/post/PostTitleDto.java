package com.project.Glog.dto.response.post;

import com.project.Glog.domain.TemplateTemporary;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PostTitleDto {
    private Long Id;
    private String title;

    public static PostTitleDto of(TemplateTemporary templateTemporary) {
        return new PostTitleDto(templateTemporary.getId(),
                templateTemporary.getTitle());
    }
}