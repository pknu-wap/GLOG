package com.project.Glog.dto.response.blog;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReadMeDto {
    private String blogName;
    private String content;
    private Boolean isMe;
}
