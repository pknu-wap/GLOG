package com.project.Glog.dto;

import com.project.Glog.domain.Path;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PathDto {
    private String influxPath;

    public static PathDto of(Path path) {
        return new PathDto(path.getInfluxPath());
    }
}
