package com.project.Glog.service;

import com.project.Glog.domain.Category;
import com.project.Glog.domain.PrPost;
import com.project.Glog.domain.User;
import com.project.Glog.dto.response.pr.PrPostResponse;
import com.project.Glog.dto.response.pr.PrPostedDtos;
import com.project.Glog.repository.CategoryRepository;
import com.project.Glog.repository.PrPostRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PrPostService {

    @Autowired
    private PrPostRepository prPostResponse;

    @Autowired
    private CategoryRepository categoryRepository;

    public PrPostResponse readPrPosted(UserPrincipal userPrincipal, Long categoryId) {
        List <PrPost> prPost = prPostResponse.findAllBycategoryId(categoryId);
        Category currentCategory = categoryRepository.findByCategoryId(categoryId);
        Boolean isAuthor;

        if(userPrincipal.getId() == currentCategory.getBlog().getUser().getId()){
            isAuthor = true;
        }
        else{
            isAuthor = false;
        }

        PrPostedDtos prPostedDtos = new PrPostedDtos(prPost);

        return new PrPostResponse(isAuthor,prPostedDtos);
    }
}
