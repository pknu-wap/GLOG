package com.project.Glog.dto.response.category;

import com.project.Glog.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {
    private String categoryName;
    private boolean isPrCategory;

    public static CategoryDto of(Category category){
        return new CategoryDto(
                category.getCategoryName(),
                category.getIsPrcategory());
    }
}
