package com.project.Glog.dto.response.pr;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PrPost;
import com.project.Glog.dto.PostPreviewDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PrPostedDtos {
    private List<PrPostedDto> prPostedDtos = new ArrayList<>();

    public PrPostedDtos (List<PrPost> prPosts){
        for(PrPost prPost : prPosts){
            prPostedDtos.add(PrPostedDto.of(prPost));
        }
    }
}
