package com.project.Glog.dto;

import com.project.Glog.domain.Reply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter @Setter
public class ReplyDto {
    private Long replyId;
    private UserDto userDto;
    private String message;
    private Integer likesCount;
    private Boolean isEdit;
    private LocalDateTime createdAt;
    private Boolean isLiked;
    private String who;

    public ReplyDto(Long replyId, UserDto userDto, String message, Integer likesCount, Boolean isEdit, LocalDateTime createdAt) {
        this.replyId = replyId;
        this.userDto = userDto;
        this.message = message;
        this.likesCount = likesCount;
        this.isEdit = isEdit;
        this.createdAt = createdAt;
    }

    public static ReplyDto of(Reply reply){
        return new ReplyDto(
                reply.getId(),
                UserDto.of(reply.getUser()),
                reply.getMessage(),
                reply.getLikesCount(),
                reply.getIsEdit(),
                reply.getCreatedAt()
        );
    }
}
