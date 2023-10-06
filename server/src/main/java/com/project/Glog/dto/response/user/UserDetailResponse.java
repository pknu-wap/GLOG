package com.project.Glog.dto.response.user;

import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class UserDetailResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private String introduction;

    public static UserDetailResponse of(User user){
        return new UserDetailResponse(user.getId(),
                user.getNickname(),
                user.getImageUrl(),
                user.getIntroduction());
    }
}
