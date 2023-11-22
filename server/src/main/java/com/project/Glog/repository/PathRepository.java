package com.project.Glog.repository;

import com.project.Glog.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PathRepository extends JpaRepository<Path, Long> {

    @Query("SELECT p FROM Path p WHERE p.user.id = :userId")
    List<Path> findAllByUserId(@Param("userId") Long userId);
}
