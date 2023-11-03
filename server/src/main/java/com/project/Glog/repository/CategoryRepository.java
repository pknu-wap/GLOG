package com.project.Glog.repository;

import com.project.Glog.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category,Long> {
    @Query("SELECT c FROM Category c JOIN c.blog b WHERE b.id = :blogId")
    List<Category> findAllByBlogId(@Param("blogId") Long blogId);

    @Query("SELECT c FROM Category c WHERE c.id = :categoryId")
    Category findByCategoryId(@Param("categoryId") Long categoryId);



}
