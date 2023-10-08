package com.project.Glog.dto.request.reply;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.Reply;
import com.project.Glog.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReplyCreateRequest {
    private Long postId;
    private String message;

    public Reply toReply(Post post, User user){
        Reply reply = new Reply();
        reply.setPost(post);
        reply.setUser(user);
        reply.setMessage(message);
        reply.setLikesCount(0);
        reply.setIsEdit(false);
        return reply;
    }
}
