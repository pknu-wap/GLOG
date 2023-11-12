package com.project.Glog.dto.response.pr;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GithubRepositoryInfo {
    private String name;
    private Owner owner;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Owner {
        private String login;
    }
}
