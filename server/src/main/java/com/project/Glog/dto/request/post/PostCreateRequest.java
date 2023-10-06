package com.project.Glog.dto.request.post;

import com.project.Glog.domain.Post;
import com.project.Glog.security.UserPrincipal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

@AllArgsConstructor
@Getter @Setter
public class PostCreateRequest {
    private String title;
    private String content;
    private String hashtags;
    private Boolean isPrivate;
    private Boolean isPr;
    private Long categoryId;


    public Post toPost() {
        return new Post(
                null,
                null,
                null,
                null,
                title,
                content,
                null,
                null,
                0,
                0,
                isPrivate,
                isPr,
                hashtags,
                null);
    }
}