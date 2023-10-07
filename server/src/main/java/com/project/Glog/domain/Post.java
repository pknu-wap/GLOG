package com.project.Glog.domain;

import com.project.Glog.dto.request.post.PostCreateRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

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
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostHashtag> hashtags;

    @NotNull
    private String title;

    @NotNull
    private String content;

    private String imageUrl;

    @NotNull
    private String blogUrl;

    @NotNull
    private Integer likesCount;

    @NotNull
    private Integer viewsCount;

    @NotNull
    private Boolean isPrivate;

    @NotNull
    private Boolean isPr;
    @CreatedDate
    private LocalDateTime createdAt;

    public void update(PostCreateRequest req){
        this.title=req.getTitle();
        this.content=req.getContent();
        this.isPrivate=req.getIsPrivate();
        this.isPr=req.getIsPr();
    }

}