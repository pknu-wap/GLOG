package com.project.Glog.dto.response.pr;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PrInfo {
    private Integer number;
    private String title;
    private String body;
    private User user;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class User{
        private String login;
    }
}
