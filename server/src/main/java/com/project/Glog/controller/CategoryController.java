package com.project.Glog.controller;

import com.project.Glog.dto.request.category.CategoryCreateRequest;
import com.project.Glog.dto.response.category.CategoryDto;
import com.project.Glog.dto.response.category.SidebarDtos;
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

    @PostMapping("/category")
    public ResponseEntity<String> save(@CurrentUser UserPrincipal userPrincipal,
                                       @RequestBody CategoryCreateRequest categoryCreateRequest){

        categoryService.create(userPrincipal, categoryCreateRequest);

        return new ResponseEntity<>("success create category",HttpStatus.OK);
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

    @GetMapping ("/category/sidebar/{blogId}")
    public ResponseEntity<SidebarDtos> getSidebarByBlog(@PathVariable Long blogId){

        //해당 블로그의 사이드바를 읽어 온다
        SidebarDtos sidebarResponse = categoryService.getSideBarByBlog(blogId);

        return new ResponseEntity<>(sidebarResponse,HttpStatus.OK);
    }
}
