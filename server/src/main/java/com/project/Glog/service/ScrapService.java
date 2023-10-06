package com.project.Glog.service;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.Scrap;
import com.project.Glog.domain.User;
import com.project.Glog.dto.PostPreviewDtos;
import com.project.Glog.repository.PostRepository;
import com.project.Glog.repository.ScrapRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ScrapService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ScrapRepository scrapRepository;

    public PostPreviewDtos getScrapPosts(UserPrincipal userPrincipal, int page){
        User user = userRepository.findById(userPrincipal.getId()).get();

        PageRequest pageRequest = PageRequest.of(page, 8, Sort.by("id").descending());
        Page<Scrap> scrapPage = scrapRepository.findScrapsByUser(user, pageRequest);

        List<Scrap> scrapList = scrapPage.getContent();
        List<Post> postList = scrapList.stream()
                .map(Scrap::getPost)
                .collect(Collectors.toList());

        return new PostPreviewDtos(postList, scrapPage.getTotalPages());
    }

    public String clickScrap(UserPrincipal userPrincipal, Long postId){
        Optional<Scrap> optionalScrap = scrapRepository.findByUserIdAndPostId(userPrincipal.getId(),postId);

        if(optionalScrap.isPresent()){
            scrapRepository.delete(optionalScrap.get());
            return "remove";
        }
        else{
            Scrap scrap = new Scrap();

            scrap.setUser(userRepository.findById(userPrincipal.getId()).get());
            scrap.setPost(postRepository.findById(postId).get());

            scrapRepository.save(scrap);

            return "add";
        }
    }
}
