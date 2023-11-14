package com.project.Glog.dto.response.pr;

import com.project.Glog.domain.PrPost;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class PrUnPostedDtos {
    private List<PrUnPostedDto> prUnPostedDtos = new ArrayList<>();

    public PrUnPostedDtos (List<PrPost> prPosts){
        for(PrPost prPost : prPosts){
            prUnPostedDtos.add(PrUnPostedDto.of(prPost));
        }
    }
}
