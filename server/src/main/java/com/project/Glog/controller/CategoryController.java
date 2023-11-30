package com.project.Glog.controller;

import com.project.Glog.dto.request.category.CategoryCreateRequest;
import com.project.Glog.dto.request.category.CategoryUpdateRequest;
import com.project.Glog.dto.response.category.CategoryDto;
import com.project.Glog.dto.response.category.SidebarDtos;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/category")
    public ResponseEntity<String> saveCategory(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestBody CategoryCreateRequest categoryCreateRequest){

        categoryService.create(userPrincipal, categoryCreateRequest);

        return new ResponseEntity<>("success create category",HttpStatus.OK);
    }

    @PutMapping("/category")
    public ResponseEntity<String> updateCategory(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestBody CategoryUpdateRequest categoryUpdateRequest){

        try{
            categoryService.updateCategory(userPrincipal, categoryUpdateRequest);
            return new ResponseEntity<>("success update category",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/category")
    public ResponseEntity<CategoryDto> getCategory(@RequestParam Long categoryId){

        CategoryDto categoryDto = categoryService.getCategory(categoryId);

        return new ResponseEntity<>(categoryDto,HttpStatus.OK);
    }

    @DeleteMapping("/category")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestParam("categoryId") Long categoryId){
            categoryService.delete(userPrincipal.getId(), categoryId);

            return new ResponseEntity<>("success delete category",HttpStatus.OK);
    }

    @DeleteMapping("/category/posts")
    public ResponseEntity<String> deletePosts(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestBody List<Long> postsIds){
        try{
            categoryService.deletePosts(userPrincipal.getId(), postsIds);
            return new ResponseEntity<>("success delete posts",HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping ("/category/sidebar/{blogId}")
    public ResponseEntity<SidebarDtos> getSidebarByBlog(@CurrentUser UserPrincipal userPrincipal,
                                                        @PathVariable Long blogId){

        //해당 블로그의 사이드바를 읽어 온다
        SidebarDtos sidebarResponse = categoryService.getSideBarByBlog(userPrincipal, blogId);

        return new ResponseEntity<>(sidebarResponse,HttpStatus.OK);
    }
}
