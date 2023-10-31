package com.project.Glog.dto.response.guestbook;

import com.project.Glog.dto.MessageDto;
import com.project.Glog.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GuestbookResponse {
    private UserDto userDto;
    private MessageDto messageDto;
    private boolean imOwner;
    private Long guestbookId;
}
