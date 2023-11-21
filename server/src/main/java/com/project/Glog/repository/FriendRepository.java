package com.project.Glog.repository;

import com.project.Glog.domain.Friend;
import java.util.List;

import com.project.Glog.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    @Query("SELECT f FROM Friend f JOIN f.fromUser u WHERE u.id = :userId")
    List<Friend> findToUsersByFromUser(@Param("userId") Long userId);

    @Query("SELECT f FROM Friend f JOIN f.toUser u WHERE u.id = :userId")
    List<Friend> findFromUsersByToUser(@Param("userId") Long userId);

    @Query("SELECT f FROM Friend f JOIN FETCH f.fromUser fu JOIN f.toUser u " +
            "WHERE u.id = :toUserId AND fu.id = :fromUserId")
    Friend findByFromUserAndToUser(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId);

}
