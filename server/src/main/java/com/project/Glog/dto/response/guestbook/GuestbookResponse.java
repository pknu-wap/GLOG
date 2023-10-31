package com.project.Glog.dto.response.guestbook;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.BookMessage;
import com.project.Glog.domain.Guestbook;
import com.project.Glog.domain.User;
import com.project.Glog.dto.MessageDto;
import com.project.Glog.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GuestbookResponse {
    private List<MessageDto> messageDto;
    private boolean imOwner;
    private Long guestbookId;

    public static GuestbookResponse of(Guestbook guestbook, User user){
        List<BookMessage> bookMessages = guestbook.getBookMessages();
        Blog blog = guestbook.getBlog();

        List<MessageDto> messageDtos = new ArrayList<>();
        for(BookMessage message : bookMessages){
            messageDtos.add(MessageDto.of(message, user, blog));
        }

        boolean imOwner = guestbook.getUser().equals(user);

        return new GuestbookResponse(messageDtos, imOwner, guestbook.getId());
    }
}
