package com.project.Glog.dto.request.post;

import com.project.Glog.domain.Post;
import com.project.Glog.security.UserPrincipal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.util.List;

@AllArgsConstructor
@Getter @Setter
public class PostCreateRequest {
    private String title;
    private String content;
    private Boolean isPrivate;
    private Boolean isPr;
    private Long categoryId;
    private List<String> hashtags;


    public Post toPost() {
        return new Post(
                null,
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
                null);
    }
}