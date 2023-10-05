package com.project.Glog.dto.request.reply;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class ReplyGetRequest {
    private Long postId;
    private int page;
    private String order;

}
