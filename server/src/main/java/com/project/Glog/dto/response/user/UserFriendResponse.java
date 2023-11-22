package com.project.Glog.dto.response.user;

import com.project.Glog.dto.UserSimpleDtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserFriendResponse {
    private final UserSimpleDtos userSimpleDtos;
    private final int realFriendCount;

    public UserFriendResponse(UserSimpleDtos userSimpleDtos) {
        this.userSimpleDtos = userSimpleDtos;
        realFriendCount = countFriends();
    }

    private int countFriends() {
        int friendCount = 0;
        for (int i = 0; i < userSimpleDtos.getUserSimpleDtos().size(); i++) {
            if (userSimpleDtos.getUserSimpleDtos().get(i).getRelationship().equals("friend")) {
                friendCount++;
            }
        }
        return friendCount;
    }
}
