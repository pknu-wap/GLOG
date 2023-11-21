package com.project.Glog.dto;

import com.project.Glog.domain.Alarm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDtos {
    private List<AlarmDto> alarmDtos;

    public static AlarmDtos of(List<Alarm> alarms){
        List<AlarmDto> alarmDtoList = alarms.stream()
                .map(AlarmDto::of)
                .collect(Collectors.toList());
        return new AlarmDtos(alarmDtoList);
    }
}
