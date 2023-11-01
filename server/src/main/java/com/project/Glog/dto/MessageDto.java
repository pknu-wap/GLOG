package com.project.Glog.dto;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.BookMessage;
import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private UserDto userDto;
    private Long messageId;
    private String message;
    private LocalDateTime createdAt;
    private String who;

    public static MessageDto of(BookMessage message, User currentUser, Blog currentBlog){
        String who;
        User author = message.getUser();
        User owner = currentBlog.getUser();
        if(author.equals(owner)){
            if(author.equals(currentUser))
                who = "owner(me)";
            else
                who = "owner";
        }
        else{
            if(author.equals(currentUser))
                who = "me";
            else
                who = "other";
        }


        return new MessageDto(
                UserDto.of(message.getUser()),
                message.getId(),
                message.getMessage(),
                message.getCreatedAt(),
                who
        );
    }
}
