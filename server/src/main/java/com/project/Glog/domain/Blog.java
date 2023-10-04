package com.project.Glog.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "blog")
public class Blog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @NotNull
    private String blogName;

    @NotNull
    private String blogUrl;

    private String readme;   // 리드미

    public Blog(User user, String blogUrl, String blogName) {
        this.user = user;
        this.blogUrl = blogUrl;
        this.blogName = blogName;
    }
}
