package com.project.Glog.dto.responsee.reply;

import com.project.Glog.dto.ReplyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter @Setter
public class ReplyGetResponse {
    private List<ReplyDto> replyDtos;
    private Boolean imOwner;
}
