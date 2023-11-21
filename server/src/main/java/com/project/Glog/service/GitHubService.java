package com.project.Glog.service;

import com.project.Glog.domain.GithubRepository;
import com.project.Glog.domain.PrPost;
import com.project.Glog.domain.User;
import com.project.Glog.dto.response.pr.*;
import com.project.Glog.repository.CategoryRepository;
import com.project.Glog.repository.GithubRepoRepository;
import com.project.Glog.repository.PrPostRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@Service
public class GitHubService {
    @Autowired
    private GithubRepoRepository githubRepositoryRepository;
    @Autowired
    private PrPostRepository prPostRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    private final RestTemplate restTemplate;
    private static final String GITHUB_API_URL = "https://api.github.com";

    public GitHubService() {
        this.restTemplate = new RestTemplate();
    }

    public List<GithubRepositoryInfo> getUserRepo(User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + user.getGithubToken());
        headers.setContentType(MediaType.APPLICATION_JSON);



        // 인증된 사용자 리포지토리
        String GITHUB_USER_REPOS_ENDPOINT = "/user/repos";
        String url = GITHUB_API_URL + GITHUB_USER_REPOS_ENDPOINT;

        // 쿼리 파라미터 설정
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                .queryParam("affiliation", "owner,collaborator,");

        String ghUrl = builder.toUriString();



        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<GithubRepositoryInfo[]> responseEntity = restTemplate.exchange(
                ghUrl,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                GithubRepositoryInfo[].class
        );

        GithubRepositoryInfo[] repos = responseEntity.getBody();
        if (repos != null) {
            return Arrays.asList(repos);
        } else {
            return Collections.emptyList();
        }
    }

    public List<PrInfo> getPr(User user,String owner, String repo) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + user.getGithubToken());
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 인증된 사용자 리포지토리
        String GITHUB_USER_REPOS_ENDPOINT = "/repos/" +owner + "/" + repo +"/pulls";
        String url = GITHUB_API_URL + GITHUB_USER_REPOS_ENDPOINT;

        // 쿼리 파라미터 설정
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                .queryParam("state", "all");
        // 해당 유저의 pr만 가져오기?
        //        .queryParam("user", "{userName}");

        String ghUrl = builder.toUriString();


        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<PrInfo[]> responseEntity = restTemplate.exchange(
                ghUrl,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                PrInfo[].class
        );

        PrInfo[] pr = responseEntity.getBody();
        if (pr != null) {
            return Arrays.asList(pr);
        } else {
            return Collections.emptyList();
        }
    }


    public String getUserGhToken(UserPrincipal userPrincipal){
        String GITHUB_USER_TOKEN_ENDPOINT = "/login/oauth/"+userPrincipal;
        String url = GITHUB_API_URL + GITHUB_USER_TOKEN_ENDPOINT;
        return url;
    }

    public RepositoryResponse saveAndGetRepo(List<GithubRepositoryInfo> githubRepositoryInfo, User user, Long categoryId){
        for (GithubRepositoryInfo repo : githubRepositoryInfo) {
            GithubRepository githubRepository = new GithubRepository();
            githubRepository.setUser(user);
            githubRepository.setRepoName(repo.getName());
            githubRepository.setOwnerName(repo.getOwner().getLogin());

            if(!isPresentRepo(user.getId(), githubRepository.getRepoName())) {
                githubRepositoryRepository.save(githubRepository);
            }
        }

        List<String> Repos = githubRepositoryRepository.findRepoNameByUserId(user.getId());
        Boolean isAuthor;
        if(categoryRepository.findUserByCategoryId(categoryId).getId() == user.getId()){
            isAuthor = true;
        }
        else{
            isAuthor = false;
        }
        RepositoryResponse repositoryResponse = new RepositoryResponse(isAuthor,Repos);

        return repositoryResponse;
    }

    public PrUnPostResponse saveAndGetPr(List<PrInfo> prInfos, GithubRepository githubRepository, Long categoryId, User user){
        for (PrInfo prInfo : prInfos) {
            PrPost prPost = new PrPost();
            prPost.setGithubRepository(githubRepository);
            prPost.setPrNumber(prInfo.getNumber());
            prPost.setPrTitle(prInfo.getTitle());
            prPost.setIsPosted(false);

            if(!isPresentPr(prPost.getPrNumber(), prPost.getGithubRepository())) {
                prPostRepository.save(prPost);
            }

        }

        List<PrPost> pr = prPostRepository.findByRepo(githubRepository.getId());
        PrUnPostedDtos prUnPostedDtos = new PrUnPostedDtos(pr);
        Boolean isAuthor;
        if(categoryRepository.findUserByCategoryId(categoryId).getId() == user.getId()){
            isAuthor = true;
        }
        else{
            isAuthor = false;
        }
        PrUnPostResponse prUnPostResponse = new PrUnPostResponse(isAuthor,prUnPostedDtos);

        return prUnPostResponse;
    }

    public Boolean isPresentRepo(Long userId, String reponame){
        Optional <GithubRepository> githubRepository = githubRepositoryRepository.findByRepoName(userId, reponame);

        if(githubRepository.isPresent()){
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean isPresentPr(Integer number, GithubRepository githubRepository){
        Optional <PrPost> prPost = prPostRepository.findByNumber(number, githubRepository.getId());

        if(prPost.isPresent()){
            return true;
        }
        else{
            return false;
        }
    }

}

