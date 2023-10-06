package com.project.Glog.dto.response.post;

import com.project.Glog.domain.Post;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class PostPreviewDtos {
    private List<PostPreviewDto> postPreviewDtos = new ArrayList<>();

    public PostPreviewDtos (List<Post> posts){
        for(Post post : posts){
            postPreviewDtos.add(PostPreviewDto.of(post));
        }
    }
}
