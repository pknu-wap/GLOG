package com.project.Glog.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = "friend")
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Boolean status; //0(false)은 친구추가만 //1(true)은 친구

    @ManyToOne(fetch = FetchType.LAZY)
    private User fromUser;

    @NotNull
    private Boolean fromUserNewPost;

    @ManyToOne(fetch = FetchType.LAZY)
    private User toUser;

    @NotNull
    private Boolean toUserNewPost;

}

