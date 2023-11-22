package com.project.Glog.service;

import com.project.Glog.domain.Visit;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.repository.VisitRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitService {
    @Autowired
    VisitRepository visitRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BlogRepository blogRepository;

    public void saveCount(UserPrincipal userPrincipal, Long blogId) {
        if (visitRepository.findByUserIdAndBlogId(userPrincipal.getId(), blogId) == null) {
            return;
        }
        Visit visit = new Visit();
        visit.setVisitUser(userRepository.findById(userPrincipal.getId()).get());
        visit.setBlog(blogRepository.findById(blogId).get());
        visitRepository.save(visit);
    }

    public int getVisitCount(Long userId) {
        List<Visit> visits = visitRepository.findAllByBlogId(blogRepository.findByUserId(userId).get().getId());
        return visits.size();
    }
}
