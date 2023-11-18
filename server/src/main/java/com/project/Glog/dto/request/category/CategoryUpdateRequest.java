package com.project.Glog.dto.request.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryUpdateRequest {
    private Long categoryId;
    private String newCategoryName;
}
