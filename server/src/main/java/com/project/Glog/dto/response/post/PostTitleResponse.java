package com.project.Glog.dto.response.post;

import com.project.Glog.domain.TemplateTemporary;

import java.util.List;

public record PostTitleResponse(List<PostTitleDto> postTitleResponse) {

    public static PostTitleResponse of(List<? extends TemplateTemporary> templateTemporaries) {
        final List<PostTitleDto> responses = templateTemporaries.stream()
                .map(PostTitleDto::of)
                .toList();

        return new PostTitleResponse(responses);
    }
}
