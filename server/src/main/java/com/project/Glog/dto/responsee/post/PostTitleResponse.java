package com.project.Glog.dto.responsee.post;

import com.project.Glog.domain.Temporary;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostTitleResponse {
    private List<PostTitleDto> postTitleResponse = new ArrayList<>();

    public PostTitleResponse (List<Temporary> temporaries){
        for(Temporary temporary : temporaries){
            postTitleResponse.add(PostTitleDto.of(temporary));
        }
    }
}
