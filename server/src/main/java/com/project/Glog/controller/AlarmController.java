package com.project.Glog.controller;

import com.project.Glog.dto.response.alarm.AlarmResponse;
import com.project.Glog.dto.response.blog.MyPageResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.AlarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AlarmController {
    @Autowired
    private AlarmService alarmService;

    @GetMapping("/alarms")
    public ResponseEntity<AlarmResponse> getAlarms(@CurrentUser UserPrincipal userPrincipal){

        AlarmResponse alarmsResponse = alarmService.getAlarms(userPrincipal.getId());

        return new ResponseEntity<>(alarmsResponse, HttpStatus.OK);
    }
}
