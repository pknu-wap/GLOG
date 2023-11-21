package com.project.Glog.service;

import com.project.Glog.domain.*;
import com.project.Glog.dto.ReplyDto;
import com.project.Glog.dto.request.reply.ReplyCreateRequest;
import com.project.Glog.dto.request.reply.ReplyGetRequest;
import com.project.Glog.dto.request.reply.ReplyUpdateRequest;
import com.project.Glog.dto.response.reply.ReplyGetResponse;
import com.project.Glog.repository.*;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReplyService  {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReplyLikeRepository replyLikeRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AlarmRepository alarmRepository;


    public Long createReply(UserPrincipal userPrincipal, ReplyCreateRequest req) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        Post post = postRepository.findById(req.getPostId()).get();

        Reply reply = req.toReply(post, user);

        replyRepository.save(reply);

        Alarm alarm = new Alarm(
                null,
                post.getUser(),
                "게시글에 댓글이 달렸습니다.",
                false,
                AlarmType.REPLY,
                post,
                null);
        alarmRepository.save(alarm);

        return reply.getPost().getId();
    }

    public ReplyGetResponse getReplies(UserPrincipal userPrincipal, ReplyGetRequest req) {
        Post post = postRepository.findById(req.getPostId()).get();
        User currentUser = userRepository.findById(userPrincipal.getId()).get();
        Long authorId = postRepository.findById(post.getId()).get().getUser().getId();

        Boolean imOwner = (authorId == userPrincipal.getId());

        PageRequest pageRequest = PageRequest.of(req.getPage(), 10, Sort.by(req.getOrder()).descending());
        List<Reply> replys = replyRepository.findRepliesByPost(post, pageRequest).getContent();
        List<ReplyDto> replyDtos = new ArrayList<>();
        for(Reply reply : replys){
            ReplyDto replyDto = ReplyDto.of(reply);

            Boolean isLiked = replyLikeRepository.findByReplyAndUser(reply.getId(), currentUser.getId()).isPresent();
            replyDto.setIsLiked(isLiked);

            String who;
            if(reply.getUser().getId() == currentUser.getId()){
                if(imOwner){
                    who = "me(author)";
                }
                else{
                    who = "me";
                }
            }
            else{
                if(reply.getUser().getId() == authorId){
                    who = "author";
                }
                else{
                    who = "other";
                }
            }
            replyDto.setWho(who);

            replyDtos.add(replyDto);
        }

        return new ReplyGetResponse(replyDtos, imOwner);
    }


    public void updateReply(UserPrincipal userPrincipal, ReplyUpdateRequest req) throws Exception{
        Reply reply = replyRepository.findById(req.getRepyId()).get();

        if(userPrincipal.getId()!=reply.getUser().getId()){
            throw new IllegalAccessException("not owner");
        }

        reply.setMessage(req.getMessage());
        replyRepository.save(reply);
    }

    public void deleteReply(UserPrincipal userPrincipal, Long replyId) throws Exception{
        Reply reply = replyRepository.findById(replyId).get();

        if(userPrincipal.getId()!=reply.getUser().getId()){
            throw new IllegalAccessException("not owner");
        }

        replyRepository.delete(reply);
    }

    public String clickLike(UserPrincipal userPrincipal, Long replyId) {
        Reply reply = replyRepository.findById(replyId).get();
        User currentUser = userRepository.findById(userPrincipal.getId()).get();

        Optional<ReplyLike> replyLikeOptional = replyLikeRepository.findByReplyAndUser(reply.getId(), currentUser.getId());
        if(replyLikeOptional.isPresent()){
            reply.setLikesCount(reply.getLikesCount()-1);
            replyRepository.save(reply);

            replyLikeRepository.delete(replyLikeOptional.get());
            return "remove";
        }
        else{
            reply.setLikesCount(reply.getLikesCount()+1);
            replyRepository.save(reply);

            ReplyLike replyLike = new ReplyLike(null,currentUser,reply);
            replyLikeRepository.save(replyLike);
            return "add";
        }
    }
}
