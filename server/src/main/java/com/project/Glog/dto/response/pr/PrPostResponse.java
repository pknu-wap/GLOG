package com.project.Glog.dto.response.pr;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PrPostResponse {
    private Boolean isAuthor;

    private PrPostedDtos prPostedDtos;
}
