package com.project.Glog.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "scrap")
public class Scrap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @ManyToOne
    private Post post;

}
