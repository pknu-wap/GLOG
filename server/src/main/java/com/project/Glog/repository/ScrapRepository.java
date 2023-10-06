package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.Scrap;
import com.project.Glog.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    @Query("SELECT s FROM Scrap s JOIN s.user u join s.post p WHERE u.id = :userId AND p.id = :postId")
    Optional<Scrap> findByUserIdAndPostId(@Param("userId") Long userId, @Param("postId") Long postId);

    Page<Scrap> findScrapsByUser(User user, Pageable pageable);

}
