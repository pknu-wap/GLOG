package com.project.Glog.service;


import com.project.Glog.domain.Template;
import com.project.Glog.domain.TemplateHashtag;
import com.project.Glog.dto.PostBasicDto;
import com.project.Glog.dto.response.post.PostTitleResponse;
import com.project.Glog.repository.TemplateHashtagRepository;
import com.project.Glog.repository.TemplateRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import com.project.Glog.util.AwsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemplateService {
    @Autowired
    private TemplateRepository templateRepository;
    @Autowired
    private TemplateHashtagRepository templateHashtagRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AwsUtils awsUtils;

    public PostTitleResponse readTemplates(UserPrincipal userPrincipal) {

        List<Template> templates = templateRepository.findByUserId(userPrincipal.getId());

        return new PostTitleResponse(templates);
    }


    public PostBasicDto readTemplateDetail(UserPrincipal userPrincipal, Long templateId) {
        Template template = templateRepository.findById(templateId).get();
        List<TemplateHashtag> temporaryHashtags = templateHashtagRepository.findTemplateHashtagsByTemplate(template);

        List<String> tags = temporaryHashtags.stream()
                .map(TemplateHashtag::getTag) // 각 Hashtags 객체에서 tag 속성을 추출
                .collect(Collectors.toList());

        return PostBasicDto.of(template, tags);
    }

    public Template create(UserPrincipal userPrincipal, MultipartFile multipartFile, PostBasicDto postBasicDto) throws IOException {
        Template template = new Template();

        template.setTitle(postBasicDto.getTitle());
        template.setContent(postBasicDto.getContent());

        if (!multipartFile.isEmpty())
            template.setThumbnail(awsUtils.upload(multipartFile, "thumbnail").getPath());
        template.setUser(userRepository.findById(userPrincipal.getId()).get());

        templateRepository.save(template);

        List<String> hashtags = postBasicDto.getHashtags();
        for (String hashtag : hashtags) {
            TemplateHashtag templateHashtag = new TemplateHashtag();
            templateHashtag.setTag(hashtag);
            templateHashtag.setTemplate(template);
            templateHashtagRepository.save(templateHashtag);
        }

        return template;
    }

    public void delete(UserPrincipal userPrincipal, Long templateId) throws IllegalAccessException {
        Template template = templateRepository.findById(templateId).get();

        if (template.getUser().getId() != userPrincipal.getId()) {
            throw new IllegalAccessException("It's not your templatepost");
        } else {
            templateRepository.delete(template);
        }
    }

}
