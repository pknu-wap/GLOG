package com.project.Glog.repository;

import com.project.Glog.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReplyLikeRepository extends JpaRepository<ReplyLike,Long> {

    @Query("SELECT l FROM ReplyLike l JOIN l.reply r WHERE r.id = :replyId AND l.user.id=:userId")
    List<PostLike> findByReplyAndUser(@Param("replyId") Long replyId,
                                      @Param("userId") Long userId);
}
// @Query("SELECT l FROM ReplyLike l JOIN l.user u WHERE u.id = :userId")