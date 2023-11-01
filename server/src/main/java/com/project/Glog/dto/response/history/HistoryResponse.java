package com.project.Glog.dto.response.history;

import com.project.Glog.domain.Post;
import com.project.Glog.dto.response.post.PostReadResponse;
import com.project.Glog.service.HistoryService;
import com.project.Glog.test.TestA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class HistoryResponse {
    private Week week;
    private Year year;
}
