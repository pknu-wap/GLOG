package com.project.Glog.dto.response.category;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class SidebarDtos {
    private List<SidebarDto> sidebarDtos = new ArrayList<>();

    public SidebarDtos(List<SidebarDto> sidebarDtoList){
        for(SidebarDto sidebarDto : sidebarDtoList){
            sidebarDtos.add(sidebarDto);
        }
    }
}
