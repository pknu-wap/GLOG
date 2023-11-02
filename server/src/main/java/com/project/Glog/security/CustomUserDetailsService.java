package com.project.Glog.security;

import com.project.Glog.domain.Blog;
import com.project.Glog.dto.request.user.UserInfoChangeRequest;
import com.project.Glog.dto.response.user.UserDetailResponse;
import com.project.Glog.dto.response.user.UserMypageResponse;
import com.project.Glog.exception.ResourceNotFoundException;
import com.project.Glog.domain.User;
import com.project.Glog.repository.BlogRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.util.AwsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AwsUtils awsUtils;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }


    public UserDetailResponse changeUserInfo(Long uid, UserInfoChangeRequest userInfoChangeRequest) {

        User user = userRepository.findById(uid).get();
        user.updateInfo(userInfoChangeRequest);
        userRepository.save(user);

        return UserDetailResponse.of(user);
    }

    public UserDetailResponse changeUserImage(Long uid, MultipartFile multipartFile) throws IOException {
        User user = userRepository.findById(uid).get();

        if(!multipartFile.isEmpty())
            user.setImageUrl(awsUtils.upload(multipartFile, "profile").getPath());

        userRepository.save(user);

        return UserDetailResponse.of(user);
    }

    public UserMypageResponse getUserDtail(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        Blog blog = blogRepository.findByUserId(user.getId()).get();

        return UserMypageResponse.of(user, blog);
    }

}