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
    @NotNull
    private Integer number;
    @NotNull
    private String title;
}
