package com.project.Glog.controller;

import com.project.Glog.dto.responsee.category.SidebarDtos;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/category/create")
    public ResponseEntity<String> save(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestParam String categoryName){

        categoryService.create(userPrincipal.getId(), categoryName);

        return new ResponseEntity<>("success create category",HttpStatus.OK);
    }

    @DeleteMapping("/category/delete")
    public ResponseEntity<String> delete(@CurrentUser UserPrincipal userPrincipal,
                                         @RequestParam("categoryId") Long categoryId){
            categoryService.delete(userPrincipal.getId(), categoryId);

            return new ResponseEntity<>("success delete category",HttpStatus.OK);
    }

    @GetMapping ("/category/sidebar/{blogId}")
    @ResponseBody
    public ResponseEntity<SidebarDtos> getSidebarByBlog(@PathVariable Long blogId){

        //해당 블로그의 사이드바를 읽어 온다
        SidebarDtos sidebarResponse = categoryService.getSideBarByBlog(blogId);

        return new ResponseEntity<>(sidebarResponse,HttpStatus.OK);
    }
}
