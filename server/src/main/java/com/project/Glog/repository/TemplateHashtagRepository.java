package com.project.Glog.repository;

import com.project.Glog.domain.Template;
import com.project.Glog.domain.TemplateHashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TemplateHashtagRepository extends JpaRepository<TemplateHashtag, Long> {
    List<TemplateHashtag> findTemplateHashtagsByTemplate(Template template);
}
