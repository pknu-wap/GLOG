package com.project.Glog.service;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.Scrap;
import com.project.Glog.dto.responsee.post.PostPreviewDtos;
import com.project.Glog.repository.PostRepository;
import com.project.Glog.repository.ScrapRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScrapService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ScrapRepository scrapRepository;

    public PostPreviewDtos getScrapPosts(UserPrincipal userPrincipal, Integer page){
        List<Post> posts = scrapRepository.findAllByUserId(userPrincipal.getId());
        

        return new PostPreviewDtos(posts);
    }

    public void update(UserPrincipal userPrincipal, Long postId){
        Scrap scrap = new Scrap();

        scrap.setUser(userRepository.findById(userPrincipal.getId()).get());
        scrap.setPost(postRepository.findById(postId).get());

        scrapRepository.save(scrap);
    }

    public void delete(UserPrincipal userPrincipal, Long postId){
        Scrap scrap = scrapRepository.findByUserPostId(userPrincipal.getId(),postId);
        scrapRepository.delete(scrap);
    }
}
