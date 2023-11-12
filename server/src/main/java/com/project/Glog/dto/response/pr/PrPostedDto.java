package com.project.Glog.dto.response.pr;

import com.project.Glog.domain.PrPost;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PrPostedDto {
    private Long postId;

    private Long prId;

    private Integer prNumber;

    private String prTitle;

    public static PrPostedDto of(PrPost prPost){
        return new PrPostedDto(
                prPost.getPost().getId(),
                prPost.getId(),
                prPost.getPrNumber(),
                prPost.getPrTitle());
    }
}
