package com.project.Glog.service;

import com.project.Glog.domain.Category;
import com.project.Glog.domain.Post;
import com.project.Glog.dto.responsee.category.SidebarDto;
import com.project.Glog.dto.responsee.category.SidebarDtos;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.CategoryRepository;
import com.project.Glog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private  CategoryRepository categoryRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private PostRepository postRepository;


    //TODO 수정 필요
    public Category create(Long uid, String categoryName){
        Category category = new Category();
        category.setCategoryName(categoryName);
        category.setBlog(blogRepository.findByUserId(uid).get());

        return categoryRepository.save(category);
    }

    public void delete(Long uid, Long categoryId) {
        //TODO 인가 로직 들어가야함, 예외 처리
        categoryRepository.delete(categoryRepository.findById(categoryId).get());
    }

    public SidebarDtos getSideBarByBlog(Long blogId) {
        //해당 블로그의 카테고리를 모두 불러온다.
        List<Category> categories = categoryRepository.findAllByBlogId(blogId);

        //모든 카테고리를 순회하며, 각 카테고리당 게시글을 모두 불러와서 SidebarDto에 담는다.
        List<SidebarDto> sidebarDtos = new ArrayList<>();
        for(Category category : categories){
            List<Post> posts = postRepository.findAllByCategoryId(category.getId());
            sidebarDtos.add(new SidebarDto(category, posts));
        }

        return new SidebarDtos(sidebarDtos);
    }
}
