package com.project.Glog.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.Glog.dto.request.user.UserInfoChangeRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String loginId;

    @NotNull
    private String nickname;

    private String introduction;

    private String imageUrl;

    @NotNull
    private int friendCount;

    @NotNull
    private int skin;

    @Email
    @NotNull
    private String email;

    @NotNull
    private Boolean emailVerified = false;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @NotNull
    private String providerId;


    public void updateInfo(UserInfoChangeRequest userInfoChangeRequest){
        this.nickname = userInfoChangeRequest.getName();
        this.introduction = userInfoChangeRequest.getIntroducion();
    }
}
