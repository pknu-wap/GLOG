package com.project.Glog.repository;

import com.project.Glog.domain.Category;
import com.project.Glog.domain.Post;
import com.project.Glog.domain.PrPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PrPostRepository extends JpaRepository<PrPost, Long> {

    @Query("SELECT pr FROM PrPost pr JOIN pr.category c WHERE c.id=:categoryId AND pr.isPosted=true")
    List<PrPost> findAllBycategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT pr FROM PrPost pr JOIN pr.githubRepository ghr WHERE ghr.id=:ghRepoId AND pr.prNumber=:number")
    Optional<PrPost> findByNumber(@Param("number") Integer number, @Param("ghRepoId") Long ghRepoId);

    @Query("SELECT pr FROM PrPost pr JOIN pr.githubRepository ghr WHERE ghr.id=:ghRepoId")
    List<PrPost> findByRepo( @Param("ghRepoId") Long ghRepoId);

    @Query("SELECT pr FROM PrPost pr WHERE pr.id=:prId")
    Optional<PrPost> findPrByPrId( @Param("prId") Long prId);



}
