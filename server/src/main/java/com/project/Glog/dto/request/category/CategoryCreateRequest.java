package com.project.Glog.dto.request.category;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
public class CategoryCreateRequest {
    private String categoryName;
    private Boolean isPrCategory;
    private String repositoryUrl;

    public Category toCategory(Blog blog){
        Category category = new Category();
        category.setBlog(blog);
        category.setCategoryName(categoryName);
        category.setIsPrcategory(isPrCategory);
        category.setReopsitoryUrl(repositoryUrl);
        return category;
    }
}
