package com.project.Glog.dto.response.user;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserMypageResponse {
    private Long userID;
    private Long blogId;
    private String nickName;
    private String blogName;
    private String email;
    private String introduction;

    public static UserMypageResponse of(User user, Blog blog){
        return new UserMypageResponse(user.getId(),
                blog.getId(),
                user.getNickname(),
                blog.getBlogName(),
                user.getEmail(),
                user.getIntroduction());
    }

}
