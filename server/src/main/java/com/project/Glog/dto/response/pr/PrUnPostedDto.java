package com.project.Glog.dto.response.pr;

import com.project.Glog.domain.PrPost;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PrUnPostedDto {
    private Long prId;

    private Integer prNumber;

    private String prTitle;

    public static PrUnPostedDto of(PrPost prPost){
        return new PrUnPostedDto(
                prPost.getId(),
                prPost.getPrNumber(),
                prPost.getPrTitle());
    }
}
