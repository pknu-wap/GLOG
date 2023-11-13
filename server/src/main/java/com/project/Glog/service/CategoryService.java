package com.project.Glog.service;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Category;
import com.project.Glog.domain.Post;
import com.project.Glog.dto.request.category.CategoryCreateRequest;
import com.project.Glog.dto.request.category.CategoryUpdateRequest;
import com.project.Glog.dto.response.category.CategoryDto;
import com.project.Glog.dto.response.category.SidebarDto;
import com.project.Glog.dto.response.category.SidebarDtos;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.CategoryRepository;
import com.project.Glog.repository.PostRepository;
import com.project.Glog.security.UserPrincipal;
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

    public Category create(UserPrincipal userPrincipal, CategoryCreateRequest req){
        Blog blog= blogRepository.findByUserId(userPrincipal.getId()).get();
        Category category = req.toCategory(blog);

        return categoryRepository.save(category);
    }

    public CategoryDto getCategory(Long categoryId){
        Category category = categoryRepository.findById(categoryId).get();
        return CategoryDto.of(category);
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

    public void deletePosts(Long id, List<Long> postsIds) throws Exception{
        List<Post> posts = new ArrayList<>();
        for(Long postId : postsIds){
            Post post = postRepository.findById(postId).get();
            if(post.getUser().getId()!=id)
                throw new IllegalAccessException("not your post");

            posts.add(post);
        }

        int idCnt = postsIds.size();
        int postCnt = posts.size();

        if(idCnt!=postCnt){
            throw new IllegalArgumentException("non-existent id");
        }

        for(Post post : posts){
            postRepository.delete(post);
        }
    }

    public void updateCategory(UserPrincipal userPrincipal, CategoryUpdateRequest categoryUpdateRequest) throws Exception{
        Category category = categoryRepository.findById(categoryUpdateRequest.getCategoryId()).get();

        if(userPrincipal.getId()!=category.getBlog().getUser().getId())
            throw new IllegalAccessException("not your category");

        category.setCategoryName(categoryUpdateRequest.getNewCategoryName());
        categoryRepository.save(category);
    }
}
