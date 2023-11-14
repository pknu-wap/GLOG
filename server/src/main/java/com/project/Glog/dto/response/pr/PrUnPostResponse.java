package com.project.Glog.dto.response.pr;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PrUnPostResponse {
    private Boolean isAuthor;

    private PrUnPostedDtos prUnPostedDtos;
}
