package com.project.Glog.dto.responsee.user;

import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class UserDto {
    private Long id;
    private String name;
    private String imageUrl;
    private String introduction;

    public static UserDto of(User user){
        return new UserDto(user.getId(),
                user.getName(),
                user.getImageUrl(),
                user.getIntroduction());
    }
}
