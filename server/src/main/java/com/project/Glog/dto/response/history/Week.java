package com.project.Glog.dto.response.history;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class Week {
    private Boolean mon;
    private Boolean tue;
    private Boolean wed;
    private Boolean thu;
    private Boolean fri;
    private Boolean sat;
    private Boolean sun;
    public static Week of(List<Boolean> week){
        return new Week(
                week.get(0),
                week.get(1),
                week.get(2),
                week.get(3),
                week.get(4),
                week.get(5),
                week.get(6));
    }
}
