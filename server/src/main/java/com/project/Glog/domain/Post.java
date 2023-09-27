package com.project.Glog.domain;

import com.project.Glog.dto.request.post.PostUpdateRequest;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Blog blog;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @Nullable
    private String imageUrl;

    @NotNull
    private String blogUrl;

    @NotNull
    private Integer likesCount;

    @NotNull
    private Integer viewsCount;

    @NotNull
    private Boolean isPrivate;

    private String hashtags; // TODO Hashtag

    @NotNull
    private Boolean isPrPost;

    @CreatedDate
    private LocalDateTime createdAt;



    public void update(PostUpdateRequest postUpdateRequest){
        this.title=postUpdateRequest.getTitle();
        this.content=postUpdateRequest.getContent();
        this.isPrivate=postUpdateRequest.getIsPrivate();
        this.hashtags= postUpdateRequest.getHashtags();
    }

}