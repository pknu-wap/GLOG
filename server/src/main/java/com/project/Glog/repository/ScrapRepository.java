package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    @Query("SELECT s FROM Scrap s JOIN s.user u WHERE u.id = :userId")
    List<Post> findAllByUserId(@Param("userId") Long userId);
}
