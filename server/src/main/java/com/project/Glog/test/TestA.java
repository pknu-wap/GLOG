package com.project.Glog.test;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "testA")
public class TestA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "testA", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TestB> testBS;
}
