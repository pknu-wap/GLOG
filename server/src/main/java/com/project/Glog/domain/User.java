package com.project.Glog.domain;

import com.project.Glog.dto.request.user.UserInfoChangeRequest;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    private String githubID;

    private String githubToken;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Blog blog;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Post> posts;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostLike> postLikes;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reply> replies;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Guestbook guestBook;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookMessage> bookMessages;
    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Friend> fromFriends;
    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Friend> toFriends;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<History> histories;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Scrap> scraps;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Template> templates;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Temporary> temporaries;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =FetchType.LAZY)
    private List<Alarm> alarms;


    public void updateInfo(UserInfoChangeRequest userInfoChangeRequest) {
        this.nickname = userInfoChangeRequest.getName();
        this.introduction = userInfoChangeRequest.getIntroduction();
    }
}

