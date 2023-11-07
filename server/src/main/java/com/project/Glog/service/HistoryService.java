package com.project.Glog.service;

import com.project.Glog.domain.History;
import com.project.Glog.dto.response.history.HistoryResponse;
import com.project.Glog.dto.response.history.Week;
import com.project.Glog.dto.response.history.Year;
import com.project.Glog.repository.HistoryRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
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



        List<History> ListYearHistory = historyRepository.findByIdYearDate(userPrincipal.getId(), Date, startDate);
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
        for (int i = 0; i < 7; i++) {
            weekList.add(false);
        }

        List<Integer> yearList = new ArrayList<>();
        if(ListYearHistory.isEmpty()){
            while (!startDate.isAfter(Date)){
                yearList.add(0);
                startDate = startDate.plusDays(1);
            }
        }
        else {
            while (!startDate.isAfter(Date)) {
                LocalDate checkDate = startDate;

                Optional<History> findHistory = ListYearHistory.stream()
                        .filter(History -> History.getDate().equals(checkDate))
                        .findAny();

                if (findHistory.isPresent()) {
                    History findedHistory = findHistory.get();
                    yearList.add(findedHistory.getCount());
                } else {
                    yearList.add(0);
                }
                startDate = startDate.plusDays(1);
            }
        }

        Week week = Week.of(weekList);
        Year year = new Year(yearDate,yearList);

        return new HistoryResponse(week,year);
    }

}
