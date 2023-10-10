package com.project.Glog.test;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestARepository extends JpaRepository<TestA, Long> {
}
