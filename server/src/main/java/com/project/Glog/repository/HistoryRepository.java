package com.project.Glog.repository;

import com.project.Glog.domain.History;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistoryRepository  extends JpaRepository<History,Long> {
    @Query("SELECT h FROM History h WHERE h.user.id = :userId AND h.date= :date")
    History findByDate(@Param("userId") Long userid , @Param("date") LocalDate date);

    @Query("SELECT h FROM History h WHERE h.user.id = :userId AND h.date BETWEEN :startDate AND :date ORDER BY h.date ASC")
    List<History> findByIdYearDate(@Param("userId") Long userid , @Param("date") LocalDate date, @Param("startDate") LocalDate startDate);

    @Query("SELECT h.date FROM History h WHERE h.user.id = :userId AND h.date BETWEEN :weekDate AND :date ORDER BY h.date ASC")
    List<LocalDate> findByIdWeekDate(@Param("userId") Long userid , @Param("date") LocalDate date, @Param("weekDate") LocalDate weekDate);

}
