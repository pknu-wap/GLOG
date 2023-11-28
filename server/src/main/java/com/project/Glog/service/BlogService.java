package com.project.Glog.service;

import com.project.Glog.domain.Blog;
import com.project.Glog.domain.Guestbook;
import com.project.Glog.domain.User;
import com.project.Glog.dto.request.user.UserCreateRequest;
import com.project.Glog.dto.response.blog.MyPageResponse;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.GuestbookRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GuestbookRepository guestbookRepository;
    public MyPageResponse getMypage(Long uid){
        return MyPageResponse.of(blogRepository.findByUserId(uid).get());
    }

    public MyPageResponse changeBlogName(Long uid, String newBlogName){
        Blog blog = blogRepository.findByUserId(uid).get();
        blog.setBlogName(newBlogName);
        blogRepository.save(blog);
        return MyPageResponse.of(blog);
    }
    public String registerBlog(UserPrincipal userPrincipal, UserCreateRequest userCreateRequest){
        Blog blog = new Blog();
        User user = userRepository.findById(userPrincipal.getId()).get();

        blog.setUser(user);
        blog.setBlogName(userCreateRequest.getBlogName());
        blog.setBlogUrl(userCreateRequest.getBlogUrl());
        user.setNickname(userCreateRequest.getNickname());
        user.setImageUrl("https://elasticbeanstalk-us-east-1-064991853848.s3.amazonaws.com/profile/defaultImages.jpg");

        Guestbook guestBook = new Guestbook();
        guestBook.setBlog(blog);
        guestBook.setUser(user);
        blog.setGuestBook(guestBook);

        blogRepository.save(blog);
        userRepository.save(user);
        guestbookRepository.save(guestBook);

        return blog.getBlogUrl();
    }

    public Long getBlogId(String blogUrl){
        return blogRepository.findByBlogUrl(blogUrl);
    }

    public String getReadme(Long blogId){
        return blogRepository.getReferenceById(blogId).getReadme();
    }

    public void registerReadme(UserPrincipal userPrincipal, String readme){
        Blog blog = blogRepository.findByUserId(userPrincipal.getId()).get();
        blog.setReadme(readme);
        blogRepository.save(blog);
    }
}
