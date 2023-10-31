package com.project.Glog.repository;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
    Guestbook findByBlog_Id(Long blogId);
}
