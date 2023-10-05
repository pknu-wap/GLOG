package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Page<Reply> findRepliesByPost(Post post, Pageable pageable);
}
