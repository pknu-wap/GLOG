package com.project.Glog.service;

import com.project.Glog.dto.response.alarm.AlarmResponse;
import com.project.Glog.repository.AlarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlarmService {
    @Autowired
    private AlarmRepository alarmRepository;
    public AlarmResponse getAlarms(Long id) {
        return null;
    }
}
