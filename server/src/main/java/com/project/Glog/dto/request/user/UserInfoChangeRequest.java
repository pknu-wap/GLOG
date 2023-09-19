package com.project.Glog.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class UserInfoChangeRequest {
    private String name;
    private String introducion;
}
