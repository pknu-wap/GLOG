package com.project.Glog.dto;

import com.project.Glog.domain.Alarm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlarmDto {
    private String message;
    private Boolean read;
    private LocalDateTime createdAt;

    public static AlarmDto of(Alarm alarm){
        return new AlarmDto(
                alarm.getMessage(),
                alarm.getRead(),
                alarm.getCreatedAt());
    }
}
