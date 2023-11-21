package com.project.Glog.controller;

import com.project.Glog.domain.GithubRepository;
import com.project.Glog.domain.User;
import com.project.Glog.dto.response.pr.RepositoryResponse;
import com.project.Glog.repository.GithubRepoRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GitHubController {
    @Autowired
    private GitHubService gitHubService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GithubRepoRepository githubRepoRepository;



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
        GithubRepository githubRepository = githubRepoRepository.findRepoByUserId(user.getId(), repo).get();

        return new ResponseEntity<>(gitHubService.saveAndGetPr(gitHubService.getPr(user,githubRepository.getOwnerName(),repo), githubRepository, categoryId, user),HttpStatus.OK);
    }


}
