package com.project.Glog.dto.responsee.category;

import com.project.Glog.domain.Category;
import com.project.Glog.domain.Post;
import com.project.Glog.dto.PostTitleDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class SidebarDto {
    private Long categoryId;
    private String categoryName;
    private List<PostTitleDto> postTitleDtos = new ArrayList<>();   //TODO 일급 컬렉션으로 수정

    public SidebarDto(Category category, List<Post> posts){
        categoryId = category.getId();
        categoryName = category.getCategoryName();
        for(Post post : posts){
            postTitleDtos.add(PostTitleDto.of(post));
        }
    }
}
