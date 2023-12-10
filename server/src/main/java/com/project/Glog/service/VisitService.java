package com.project.Glog.service;

import com.project.Glog.domain.Visit;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.repository.VisitRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class VisitService {
    private final String VISIT_COOKIE_NAME = "visit_Count";
    @Autowired
    VisitRepository visitRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BlogRepository blogRepository;

    public int getVisitCount(Long userId) {
        Long blogId = blogRepository.findByUserId(userId).get().getId();
        Visit visit = visitRepository.findByBlogId(blogId);
        if (visit == null) {
            visit = new Visit();
            visit.setBlog(blogRepository.findById(blogId).get());
            visit.makeCreatedDate();
            visitRepository.save(visit);
        }
        visit = checkVisitDate(visit, blogId);
        return visit.getCount();
    }

    public Cookie addVisitCountByCookie(HttpServletRequest request, Long blogId) {
        Cookie[] cookies = request.getCookies();
        Cookie oldCookie = this.findCookie(cookies, VISIT_COOKIE_NAME);

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + blogId + "]")) {
                oldCookie.setValue(oldCookie.getValue() + "[" + blogId + "]");
                oldCookie.setPath("/");
                addVisitCount(blogId);
            }
            return oldCookie;
        }

        Cookie newCookie = new Cookie(VISIT_COOKIE_NAME, "[" + blogId + "]");
        newCookie.setPath("/");
        addVisitCount(blogId);
        return newCookie;
    }

    private Cookie findCookie(Cookie[] cookies, String name) {
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equalsIgnoreCase(name)) {
                    return cookie;
                }
            }
        }
        return null;
    }

    public void addVisitCount(Long blogId) {
        Visit visit = visitRepository.findByBlogId(blogId);
        if (visit == null) {
            visit = new Visit();
            visit.setBlog(blogRepository.findById(blogId).get());
            visit.makeCreatedDate();
        }
        visit = checkVisitDate(visit, blogId);
        visit.addCount();
        visitRepository.save(visit);
    }

    public Visit checkVisitDate(Visit visit, Long blogId) {
        if (!isCurrentDate(visit)) {
            visitRepository.delete(visit);
            Visit newVisit = new Visit();
            newVisit.makeCreatedDate();
            newVisit.setBlog(blogRepository.findById(blogId).get());
            visitRepository.save(newVisit);
            return newVisit;
        }
        return visit;
    }

    private boolean isCurrentDate(Visit visit) {
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isAfter(visit.getDate())) {
            return false;
        }
        return true;
    }
}
