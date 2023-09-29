package com.project.Glog.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ReplyDto {
    private Long replyId;
    private Long userId;
    private String nickname;
    private String profileImage;
    private String message;
    private LocalDateTime createdAt;
    private Integer likesCount;
    private Boolean isLiked;
    private Boolean isUpdate;
    private String who;
}
