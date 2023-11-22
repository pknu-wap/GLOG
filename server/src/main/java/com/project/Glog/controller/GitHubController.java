package com.project.Glog.controller;

import com.project.Glog.domain.GithubRepository;
import com.project.Glog.domain.User;
import com.project.Glog.dto.response.pr.PrInfo;
import com.project.Glog.dto.response.pr.PrWriteDto;
import com.project.Glog.dto.response.pr.RepositoryResponse;
import com.project.Glog.repository.CategoryRepository;
import com.project.Glog.repository.GithubRepoRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.CurrentUser;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GitHubController {
    @Autowired
    private GitHubService gitHubService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GithubRepoRepository githubRepoRepository;
    @Autowired
    private CategoryRepository categoryRepository;



    @GetMapping("/repository")
    public ResponseEntity<?> getRepository(@CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        RepositoryResponse repositoryResponse = gitHubService.saveAndGetRepo(gitHubService.getUserRepo(user), user);

        return new ResponseEntity<>(repositoryResponse,HttpStatus.OK);
    }

    @PostMapping("/repository")
    public ResponseEntity<String> registerRepository(@CurrentUser UserPrincipal userPrincipal,@RequestParam Long categoryId,
                                                @RequestParam String repo) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        if(!gitHubService.regiRepo(user, categoryId, repo)){
            return new ResponseEntity<>("Fail Register Repository",HttpStatus.OK);
        }

        return new ResponseEntity<>("Success Register Repository",HttpStatus.OK);
    }

    @GetMapping("/pr/detail")
    public ResponseEntity<?> writePrPost(@CurrentUser UserPrincipal userPrincipal, @RequestParam Long prId) {
        PrWriteDto prWriteDto = gitHubService.writePr(prId);

        return new ResponseEntity<>(prWriteDto, HttpStatus.OK);
    }

    @GetMapping("/pr/posts/unposted")
    public ResponseEntity<?> getPullrequest(@CurrentUser UserPrincipal userPrincipal,
                                               @RequestParam Long categoryId) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        String repo = gitHubService.getRepoName(categoryId);

        GithubRepository githubRepository = githubRepoRepository.findRepoByUserId(user.getId(), repo).get();
        List<PrInfo> prInfos = gitHubService.getPr(user,githubRepository.getOwnerName(),repo);

        return new ResponseEntity<>(gitHubService.saveAndGetPr(prInfos, githubRepository, categoryId, user),HttpStatus.OK);
    }


}
