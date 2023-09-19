package com.project.Glog.security;

import com.project.Glog.dto.request.user.UserInfoChangeRequest;
import com.project.Glog.dto.responsee.user.UserDto;
import com.project.Glog.exception.ResourceNotFoundException;
import com.project.Glog.domain.User;
import com.project.Glog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

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


    public UserDto changeUserInfo(Long uid, UserInfoChangeRequest userInfoChangeRequest) {

        User user = userRepository.findById(uid).get();
        user.updateInfo(userInfoChangeRequest);
        userRepository.save(user);

        return UserDto.of(user);
    }

    public UserDto changeUserImage(Long uid, MultipartFile multipartFile) {
        User user = userRepository.findById(uid).get();

        //이미지를 S3에 저장하고 링크를 불러온다.

        userRepository.save(user);

        return UserDto.of(user);
    }
}