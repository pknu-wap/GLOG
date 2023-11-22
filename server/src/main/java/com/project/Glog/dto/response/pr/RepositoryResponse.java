package com.project.Glog.dto.response.pr;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class RepositoryResponse {
    private List<String> repository;

}

