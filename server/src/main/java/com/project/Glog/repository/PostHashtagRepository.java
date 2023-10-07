package com.project.Glog.repository;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PostHashtag;
import com.project.Glog.domain.Temporary;
import com.project.Glog.domain.TemporaryHashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostHashtagRepository extends JpaRepository<PostHashtag, Long> {
    void deletePostHashtagsByPost(Post post);
    List<PostHashtag> findPostHashtagsByPost(Post post);
}
