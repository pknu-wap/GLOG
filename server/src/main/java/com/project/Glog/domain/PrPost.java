package com.project.Glog.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "prPost")
public class PrPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @NotNull
    private Integer prNumber;
    @NotNull
    private String prTitle;
    @NotNull
    private Boolean isPosted;
    @Column(length = 50000)
    private String prBody;

    @OneToOne(fetch = FetchType.LAZY)
    private GithubRepository githubRepository;
}
