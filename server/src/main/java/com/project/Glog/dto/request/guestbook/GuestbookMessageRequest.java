package com.project.Glog.dto.request.guestbook;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GuestbookMessageRequest {
    private Long guestbookId;
    private Long messageId;
    private String message;
}
