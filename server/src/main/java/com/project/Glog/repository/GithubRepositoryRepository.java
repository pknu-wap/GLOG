package com.project.Glog.repository;

import com.project.Glog.domain.GithubRepository;
import com.project.Glog.domain.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface GithubRepositoryRepository extends JpaRepository<GithubRepository, Long> {
    @Query("SELECT gr FROM GithubRepository gr WHERE gr.user.id = :userId AND gr.repoName= :reponame")
    Optional <GithubRepository> findByRepoName(@Param("userId") Long userid , @Param("reponame") String reponame);

    @Query("SELECT gr FROM GithubRepository gr WHERE gr.user.id = :userId AND gr.repoName=:repo")
    Optional <GithubRepository> findByUserId(@Param("userId") Long userid, @Param("repo") String repo);

    @Query("SELECT gr.repoName FROM GithubRepository gr WHERE gr.user.id = :userId")
    List<String> findByUserIds(@Param("userId") Long userid);
}
