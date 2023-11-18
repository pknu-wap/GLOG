package com.project.Glog.dto;

import com.project.Glog.domain.Friend;
import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserSimpleDto {
    private Long userId;
    private Long friendId;
    private Long recentPostId;
    private boolean haveNewPost;
    private String nickname;
    private String imageUrl;
    private String relationship;

    public static UserSimpleDto of(User user, Friend friend, String relationship) {
        return new UserSimpleDto(user.getId(),
                friend.getId(),
                null,
                checkHaveNewPost(friend),
                user.getNickname(),
                user.getImageUrl(),
                relationship);
    }

    public static boolean checkHaveNewPost(Friend friend) {
        if (friend.getFromUser().equals(friend)) {
            return friend.getFromUserNewPost();
        }
        return friend.getToUserNewPost();
    }
}
