package com.project.Glog.service;

import com.project.Glog.dto.request.guestbook.GuestbookMessageRequest;
import com.project.Glog.dto.response.guestbook.GuestbookResponse;
import com.project.Glog.repository.GuestbookRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuestbookService {
    @Autowired
    private GuestbookRepository guestbookRepository;


    public void save(UserPrincipal userPrincipal, GuestbookMessageRequest req) {
    }

    public GuestbookResponse read(UserPrincipal userPrincipal, Long blogId){

        return null;
    }

    public void update(UserPrincipal userPrincipal, GuestbookMessageRequest req) {
    }

    public void delete(UserPrincipal userPrincipal, Long messageId) {
    }

}
