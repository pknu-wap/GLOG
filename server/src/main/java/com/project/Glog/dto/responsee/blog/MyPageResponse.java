package com.project.Glog.dto.responsee.blog;

import com.project.Glog.domain.Blog;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class MyPageResponse {

    public static MyPageResponse of(Blog blog){
        return new MyPageResponse();
    }
}
