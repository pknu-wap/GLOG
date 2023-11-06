package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Query("SELECT p FROM Post p JOIN p.category c WHERE c.id=:catId ")
    List<Post> findAllByCategoryId(@Param("catId") Long id);

    @Query("SELECT p FROM Post p ORDER BY p.id DESC")
    List<Post> findAllByOrderByIdDesc();

    @Query("SELECT p FROM Post p ORDER BY p.viewsCount DESC")
    List<Post> findAllByOrderByViewsDesc();

    @Query("SELECT p FROM Post p ORDER BY p.likesCount DESC")
    List<Post> findAllByOrderByLikesDesc();

    Page<Post> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM Post ORDER BY RAND() LIMIT 8", nativeQuery = true)
    List<Post> findPostsByRandom();

    List<Post> findAllByTitleContaining(String title);
    List<Post> findAllByUser(User user);
    List<Post> findAllByContentContaining(String contnt);



}
