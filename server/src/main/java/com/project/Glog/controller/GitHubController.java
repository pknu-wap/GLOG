package com.project.Glog.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.Glog.domain.GithubRepository;
import com.project.Glog.domain.User;
import com.project.Glog.dto.response.pr.GithubRepositoryInfo;
import com.project.Glog.dto.response.pr.PrPostedDto;
import com.project.Glog.dto.response.pr.RepositoryResponse;
import com.project.Glog.repository.GithubRepositoryRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
public class GitHubController {
    @Autowired
    private GitHubService gitHubService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GithubRepositoryRepository githubRepositoryRepository;



    @GetMapping("/repository")
    public ResponseEntity<?> getRepository(@CurrentUser UserPrincipal userPrincipal,
                                              @RequestParam Long categoryId) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        RepositoryResponse repositoryResponse = gitHubService.saveAndGetRepo(gitHubService.getUserRepo(user), user, categoryId);

        return new ResponseEntity<>(repositoryResponse,HttpStatus.OK);
    }

    @GetMapping("/pr/posts/unposted")
    public ResponseEntity<?> getPullrequest(@CurrentUser UserPrincipal userPrincipal, @RequestParam String repo,
                                               @RequestParam Long categoryId) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        GithubRepository githubRepository = githubRepositoryRepository.findByUserId(user.getId(), repo).get();
//        gitHubService.saveAndGetPr(gitHubService.getPr(user,githubRepository.getOwnerName(),repo,user.getGithubID()), githubRepository);

        return new ResponseEntity<>(gitHubService.saveAndGetPr(gitHubService.getPr(user,githubRepository.getOwnerName(),repo,user.getGithubID()), githubRepository, categoryId, user),HttpStatus.OK);
    }


}
