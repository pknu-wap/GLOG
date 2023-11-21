package com.project.Glog.repository;

import com.project.Glog.domain.GithubRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GithubRepoRepository extends JpaRepository<GithubRepository, Long> {
    @Query("SELECT gr FROM GithubRepository gr WHERE gr.user.id = :userId AND gr.repoName= :reponame")
    Optional <GithubRepository> findByRepoName(@Param("userId") Long userid , @Param("reponame") String reponame);

    @Query("SELECT gr FROM GithubRepository gr WHERE gr.user.id = :userId AND gr.repoName=:repo")
    Optional <GithubRepository> findRepoByUserId(@Param("userId") Long userid, @Param("repo") String repo);

    @Query("SELECT gr.repoName FROM GithubRepository gr WHERE gr.user.id = :userId")
    List<String> findRepoNameByUserId(@Param("userId") Long userid);
}
