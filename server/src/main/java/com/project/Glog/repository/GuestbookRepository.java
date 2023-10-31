package com.project.Glog.repository;

import com.project.Glog.domain.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestbookRepository extends JpaRepository<GuestBook, Long> {
}
