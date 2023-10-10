package com.project.Glog.test;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestBRepository extends JpaRepository<TestB, Long> {
}
