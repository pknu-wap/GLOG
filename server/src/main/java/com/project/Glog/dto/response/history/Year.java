package com.project.Glog.dto.response.history;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class Year {
    private LocalDate from;
    private List<Integer> posted;
}
