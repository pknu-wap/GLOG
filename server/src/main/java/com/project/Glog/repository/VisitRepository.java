package com.project.Glog.repository;

import com.project.Glog.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    @Query("SELECT v FROM Visit v JOIN v.blog b WHERE b.id = :blogId")
    Visit findByBlogId(@Param("blogId") Long blogId);
}
