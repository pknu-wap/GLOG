package com.project.Glog.dto;

import lombok.Getter;
import lombok.Setter;
import org.joda.time.DateTime;

@Getter
@Setter
public class MessageDto {
    private Long messageId;
    private String message;
    private DateTime createdAt;
    private String who;
}
