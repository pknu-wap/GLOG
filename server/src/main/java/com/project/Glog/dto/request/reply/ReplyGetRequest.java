package com.project.Glog.dto.request.reply;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class ReplyGetRequest {
    private Long postId;
    private int page;
    private String order;

}
