package com.project.Glog.dto.response.post;

import com.project.Glog.domain.Post;
import com.project.Glog.domain.PostHashtag;
import com.project.Glog.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class PostReadResponse {
    private UserDto author;
    private String blogUrl;
    private Long postId;
    private String title;
    private String content;
    private String thumbnail;
    private LocalDateTime createdAt;
    private int likesCount;
    private int viewsCount;
    private int repliesCount;
    private List<String> hashtags;
    private Boolean isPrivate;
    private Boolean isScraped;
    private Boolean isLiked;
    private Boolean isAuthor;

    public static PostReadResponse of(Post post) {
        List<String> hashtags = post.getHashtags().stream()
                .map(PostHashtag::getTag)
                .collect(Collectors.toList());

        PostReadResponse res = new PostReadResponse();

        res.setAuthor(UserDto.of(post.getUser()));
        res.setBlogUrl(post.getBlogUrl());
        res.setPostId(post.getId());
        res.setTitle(post.getTitle());
        res.setContent(post.getContent());
        res.setThumbnail(post.getThumbnail());
        res.setCreatedAt(post.getCreatedAt());
        res.setLikesCount(post.getLikesCount());
        res.setViewsCount(post.getViewsCount());
        res.setRepliesCount(post.getReplies().size());
        res.setIsPrivate(post.getIsPrivate());
        res.setHashtags(hashtags);

        return res;
    }

}




