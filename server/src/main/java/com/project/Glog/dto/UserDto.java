package com.project.Glog.dto;

import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class UserDto {
    private Long userId;
    private String nickname;
    private String profileImagee;

    public static UserDto of (User user){
        return new UserDto(user.getId(),
                user.getNickname(),
                user.getImageUrl());
    }
}
