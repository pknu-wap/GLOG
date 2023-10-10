package com.project.Glog.dto.request.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserCreateRequest {
    @NotNull
    private String blogUrl;
    @NotNull
    private String blogName;
    @NotNull
    private String nickname;
}
