package com.project.Glog.dto.response.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class SidebarDtos {
    private List<SidebarDto> sidebarDtos = new ArrayList<>();
    private Boolean isMyPage;

    public SidebarDtos(List<SidebarDto> sidebarDtoList){
        for(SidebarDto sidebarDto : sidebarDtoList){
            sidebarDtos.add(sidebarDto);
        }
    }
}
