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

    @Query("SELECT l FROM PostLike l JOIN l.post p WHERE p.id = :postId AND p.user.id = :userId")
    Optional<PostLike> findByPostAndUser(@Param("postId") Long postId,
                                          @Param("userId") Long userId);
}
