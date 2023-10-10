package com.project.Glog.repository;

import com.project.Glog.domain.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TemplateRepository extends JpaRepository<Template, Long> {
    @Query("SELECT t FROM Template t JOIN t.user u WHERE u.id=:userId")
    List<Template> findByUserId(@Param("userId") Long id);
}
