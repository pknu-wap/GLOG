package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PostLike;
import com.project.Glog.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike,Long> {

    @Query("SELECT l FROM PostLike l JOIN l.post p WHERE p.id = :blogId")
    Optional<PostLike> findByReplyAndUser(@Param("post") Post post,
                                          @Param("currentuser") User currentUser);
}
