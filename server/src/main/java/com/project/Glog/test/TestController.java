package com.project.Glog.test;

import com.project.Glog.dto.response.post.PostReadResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class TestController {
    @Autowired
    private TestARepository testARepository;
    @Autowired
    private TestBRepository testBRepository;

    @PostMapping("/test")
    public ResponseEntity<String> create(){
        TestA testA = new TestA();
        testARepository.save(testA);

        TestB testB1 = new TestB(null, testA);
        TestB testB2 = new TestB(null, testA);
        testBRepository.save(testB1);
        testBRepository.save(testB2);

        return new ResponseEntity<>("success create test", HttpStatus.OK);
    }

    @DeleteMapping ("/test")
    public ResponseEntity<String> delete(){

        TestA testA = testARepository.findById(1L).get();
        testARepository.delete(testA);

        return new ResponseEntity<>("success delete test", HttpStatus.OK);
    }
}
