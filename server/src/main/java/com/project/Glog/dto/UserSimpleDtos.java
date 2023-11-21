package com.project.Glog.dto;

import com.project.Glog.domain.Friend;
import com.project.Glog.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserSimpleDtos {
    private final List<UserSimpleDto> userSimpleDtos;

    public static UserSimpleDtos of(List<User> users, List<Friend> friends, List<String> relationships) {
        List<UserSimpleDto> userSimpleDtos = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            UserSimpleDto userSimpleDto = UserSimpleDto.of(users.get(i), friends.get(i), relationships.get(i));
            userSimpleDtos.add(userSimpleDto);
        }
        return new UserSimpleDtos(userSimpleDtos);
    }

    public UserSimpleDtos(List<UserSimpleDto> userSimpleDtos) {
        this.userSimpleDtos = userSimpleDtos;
    }
}
