package com.project.Glog.dto.response.user;

import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserModalResponse {
    private Long id;
    private String introduction;
    private String imageUrl;
    private String nickname;
    private String blogName;
    private String blogUrl;
    private String relationship;
    private int friendCount;

    public static UserModalResponse of(User user) {
        return new UserModalResponse(user.getId(),
                user.getIntroduction(),
                user.getImageUrl(),
                user.getNickname(),
                user.getBlog().getBlogName(),
                user.getBlog().getBlogUrl(),
                null,
                user.getFriendCount()
        );
    }
}
