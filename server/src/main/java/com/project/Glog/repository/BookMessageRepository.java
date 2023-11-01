package com.project.Glog.repository;

import com.project.Glog.domain.BookMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMessageRepository extends JpaRepository<BookMessage, Long> {
}
