package com.project.Glog.service;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.BookMessage;
import com.project.Glog.domain.Guestbook;
import com.project.Glog.domain.User;
import com.project.Glog.dto.request.guestbook.GuestbookMessageRequest;
import com.project.Glog.dto.response.guestbook.GuestbookResponse;
import com.project.Glog.repository.BookMessageRepository;
import com.project.Glog.repository.GuestbookRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GuestbookService {
    @Autowired
    private GuestbookRepository guestbookRepository;
    @Autowired
    private BookMessageRepository bookMessageRepository;
    @Autowired
    private UserRepository userRepository;


    public void save(UserPrincipal userPrincipal, GuestbookMessageRequest req) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        Blog blog = user.getBlog();
        Guestbook guestBook = blog.getGuestBook();

        BookMessage bookMessage = new BookMessage();
        bookMessage.setMessage(req.getMessage());
        bookMessage.setUser(user);
        bookMessage.setGuestBook(guestBook);

        bookMessageRepository.save(bookMessage);
    }

    public GuestbookResponse read(UserPrincipal userPrincipal, Long blogId){

        return null;
    }

    public void update(UserPrincipal userPrincipal, GuestbookMessageRequest req) throws Exception{
        BookMessage bookMessage = bookMessageRepository.findById(req.getMessageId()).get();
        User author = userRepository.findById(userPrincipal.getId()).get();

        if(!author.equals(bookMessage.getUser()))
            throw new Exception("not your message");

        bookMessage.setMessage(req.getMessage());
        bookMessageRepository.save(bookMessage);
    }

    public void delete(UserPrincipal userPrincipal, Long messageId) {
    }

}
