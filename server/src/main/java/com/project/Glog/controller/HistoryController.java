package com.project.Glog.controller;

import com.project.Glog.dto.response.history.HistoryResponse;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;


@RestController
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping("/history")
    public ResponseEntity<HistoryResponse> readHistory(@CurrentUser UserPrincipal userPrincipal) throws IOException {
        HistoryResponse historyResponse = historyService.readHistory(userPrincipal);

        return new ResponseEntity<>(historyResponse, HttpStatus.OK);
    }

}
