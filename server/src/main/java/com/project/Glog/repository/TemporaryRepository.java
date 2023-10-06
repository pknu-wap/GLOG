package com.project.Glog.repository;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Post;
import com.project.Glog.domain.Temporary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TemporaryRepository extends JpaRepository<Temporary,Long> {
    @Query("SELECT t FROM Temporary t  JOIN t.user u WHERE u.id=:userId")
    List<Temporary> findByUserId(@Param("userId") Long id);

}
