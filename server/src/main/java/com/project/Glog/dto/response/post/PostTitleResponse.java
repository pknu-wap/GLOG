package com.project.Glog.dto.response.post;

import com.project.Glog.domain.TemplateTemporary;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostTitleResponse {
    private List<PostTitleDto> postTitleResponse = new ArrayList<>();

    public PostTitleResponse(List<? extends TemplateTemporary> templateTemporaries) {
        for (TemplateTemporary templateTemporary : templateTemporaries) {
            postTitleResponse.add(PostTitleDto.of(templateTemporary));
        }
    }
}
