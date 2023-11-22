package com.project.Glog.repository;

import com.project.Glog.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    @Query("SELECT v FROM Visit v WHERE v.blog.id = :blogId")
    List<Visit> findAllByBlogId(@Param("blogId") Long blogId);

    @Query("SELECT v FROM Visit v WHERE v.visitUser.id = :userId AND v.blog.id = :blogId")
    Visit findByUserIdAndBlogId(@Param("userId") Long userId, @Param("blogId") Long blogId);
}
