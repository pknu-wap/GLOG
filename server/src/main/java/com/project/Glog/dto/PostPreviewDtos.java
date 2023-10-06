package com.project.Glog.dto;

import com.project.Glog.domain.Post;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class PostPreviewDtos {
    private List<PostPreviewDto> postPreviewDtos = new ArrayList<>();
    private int totalPages;

    public PostPreviewDtos (List<Post> posts, int totalPagesNumber){
        for(Post post : posts){
            postPreviewDtos.add(PostPreviewDto.of(post));
        }
        totalPages = totalPagesNumber;
    }
}
