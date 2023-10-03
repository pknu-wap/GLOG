package com.project.Glog.repository;

import com.project.Glog.domain.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
//    List<Reply> findAllByPostId(Long postId, Integer page, String order);
}
