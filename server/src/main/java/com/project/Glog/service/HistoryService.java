package com.project.Glog.service;

import com.project.Glog.domain.History;
import com.project.Glog.dto.response.history.HistoryResponse;
import com.project.Glog.dto.response.history.Week;
import com.project.Glog.dto.response.history.Year;
import com.project.Glog.repository.HistoryRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;
    public HistoryResponse readHistory(UserPrincipal userPrincipal){
        LocalDate Date = LocalDate.now();
        DayOfWeek Day = Date.getDayOfWeek();


        LocalDate startDate = Date.minusDays(364);
        LocalDate yearDate = startDate;
        LocalDate weekDate = Date.minusDays(Day.getValue()-1);



        List<LocalDate> ListYearHistory = historyRepository.findByIdYearDate(userPrincipal.getId(), Date, startDate);
        List<LocalDate> ListWeekHistory = historyRepository.findByIdWeekDate(userPrincipal.getId(), Date, weekDate);

        List<Boolean> weekList = new ArrayList<>();
        while (!weekDate.isAfter(Date)) {
            LocalDate checkDate = weekDate;
            if (ListWeekHistory.contains(checkDate)) {
                weekList.add(true);
            } else {
                weekList.add(false);
            }
            weekDate = weekDate.plusDays(1);
        }
        weekList.add(false);
        weekList.add(false);
        weekList.add(false);
        weekList.add(false);
        weekList.add(false);
        weekList.add(false);
        weekList.add(false);


        List<Boolean> yearList = new ArrayList<>();
        if(ListYearHistory.isEmpty()){
            while (!startDate.isAfter(Date)){
                yearList.add(false);
                startDate = startDate.plusDays(1);
            }
        }
        else {
            while (!startDate.isAfter(Date)) {
                LocalDate checkDate = startDate;
                if (ListYearHistory.contains(checkDate)) {
                    yearList.add(true);
                } else {
                    yearList.add(false);
                }
                startDate = startDate.plusDays(1);
            }
        }

        Week week = new Week(weekList.get(0),weekList.get(1),weekList.get(2),weekList.get(3),weekList.get(4),weekList.get(5),weekList.get(6));
        Year year = new Year(yearDate,yearList);
        HistoryResponse historyResponse = new HistoryResponse(week, year);
        return historyResponse;
    }

}
