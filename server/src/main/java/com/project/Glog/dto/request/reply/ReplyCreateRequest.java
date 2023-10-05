package com.project.Glog.dto.request.reply;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReplyCreateRequest {
    private Long postId;
    private String message;

}
