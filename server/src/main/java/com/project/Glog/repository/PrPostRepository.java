package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PrPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PrPostRepository extends JpaRepository<PrPost, Long> {

    @Query("SELECT pr FROM PrPost pr JOIN pr.category c WHERE c.id=:categoryId AND pr.isPosted=true")
    List<PrPost> findAllBycategoryId(@Param("categoryId") Long categoryId);
}
