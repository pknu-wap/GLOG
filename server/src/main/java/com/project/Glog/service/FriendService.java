package com.project.Glog.service;

import com.project.Glog.domain.Friend;
import com.project.Glog.domain.Post;
import com.project.Glog.domain.User;
import com.project.Glog.dto.UserSimpleDto;
import com.project.Glog.dto.UserSimpleDtos;
import com.project.Glog.dto.response.user.UserFriendResponse;
import com.project.Glog.dto.response.user.UserModalResponse;
import com.project.Glog.repository.FriendRepository;
import com.project.Glog.repository.PostRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FriendService {
    @Autowired
    private FriendRepository friendRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    public UserModalResponse makeUserModalResponse(UserPrincipal userPrincipal, Long personId) {
        User opponent = userRepository.findById(personId).get();
        UserModalResponse userModalResponse = UserModalResponse.of(opponent);
        userModalResponse.setRelationship(findRelationship(userPrincipal, personId));

        return userModalResponse;
    }

    public UserFriendResponse makeUserFriendResponse(UserPrincipal userPrincipal) {
        return new UserFriendResponse(makeUserSimpleDtos(userPrincipal));
    }

    public UserSimpleDtos makeUserSimpleDtos(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        List<User> users = new ArrayList<>();
        List<Friend> friends = new ArrayList<>();
        List<String> relationships = new ArrayList<>();
        for (int i = 0; i < user.getFromFriends().size(); i++) {
            users.add(user.getFromFriends().get(i).getFromUser());
            friends.add(friendRepository.findByFromUserAndToUser(user.getFromFriends().get(i).getFromUser().getId(),
                    userPrincipal.getId()));
            relationships.add(findRelationship(userPrincipal, user.getFromFriends().get(i).getFromUser().getId()));
        }
        for (int i = 0; i < user.getToFriends().size(); i++) {
            users.add(user.getToFriends().get(i).getToUser());
            friends.add(friendRepository.findByFromUserAndToUser(userPrincipal.getId(),
                    user.getToFriends().get(i).getToUser().getId()));
            relationships.add(findRelationship(userPrincipal, user.getToFriends().get(i).getToUser().getId()));
        }
        return UserSimpleDtos.of(users, friends, relationships);
    }

    public UserFriendResponse searchFriendByName(UserPrincipal userPrincipal, String name) {
        List<User> users = userRepository.findUserByNicknameContaining(name);
        UserSimpleDtos userSimpleDtos = makeUserSimpleDtos(userPrincipal);
        List<UserSimpleDto> userSimpleDtosByName = userSimpleDtos.getUserSimpleDtos().stream()
                .filter(dto -> containsUser(users, dto.getUserId()))
                .toList();

        return new UserFriendResponse(new UserSimpleDtos(userSimpleDtosByName));
    }

    private boolean containsUser(List<User> users, Long userId) {
        return users.stream().anyMatch(user -> user.getId().equals(userId));
    }

    public UserFriendResponse sortUserFriendResponse(UserPrincipal userPrincipal, String kind) {
        UserSimpleDtos userSimpleDtos = makeUserSimpleDtos(userPrincipal);
        List<UserSimpleDto> sortedFriend;
        if (kind.equals("recentFriend")) {

            List<UserSimpleDto> notFriends = userSimpleDtos.getUserSimpleDtos().stream()
                    .filter(friend -> !isFriend(friend))
                    .sorted(Comparator.comparing(UserSimpleDto::getFriendId).reversed())
                    .toList();
            List<UserSimpleDto> friends = userSimpleDtos.getUserSimpleDtos().stream()
                    .filter(this::isFriend)
                    .sorted(Comparator.comparing(UserSimpleDto::getFriendId).reversed())
                    .toList();
            sortedFriend = Stream.concat(notFriends.stream(), friends.stream()).toList();
            return new UserFriendResponse(new UserSimpleDtos(sortedFriend));
        }
        if (kind.equals("name")) {
            List<UserSimpleDto> notFriends = userSimpleDtos.getUserSimpleDtos().stream()
                    .filter(friend -> !isFriend(friend))
                    .sorted(Comparator.comparing(UserSimpleDto::getNickname, String.CASE_INSENSITIVE_ORDER))
                    .toList();
            List<UserSimpleDto> friends = userSimpleDtos.getUserSimpleDtos().stream()
                    .filter(this::isFriend)
                    .sorted(Comparator.comparing(UserSimpleDto::getNickname, String.CASE_INSENSITIVE_ORDER))
                    .toList();
            sortedFriend = Stream.concat(notFriends.stream(), friends.stream()).toList();
            return new UserFriendResponse(new UserSimpleDtos(sortedFriend));
        }
        if (kind.equals("recentPost")) {
            for (int i = 0; i < userSimpleDtos.getUserSimpleDtos().size(); i++) {
                List<Post> posts =
                        postRepository.findAllByUser(userRepository
                                .findById(userSimpleDtos.getUserSimpleDtos().get(i).getUserId()).get());
                if (posts.isEmpty()) {
                    userSimpleDtos.getUserSimpleDtos().get(i).setRecentPostId(0L);
                    continue;
                }
                List<Post> sortedPosts =
                        posts.stream().sorted(Comparator.comparing(Post::getId).reversed()).toList();
                userSimpleDtos.getUserSimpleDtos().get(i).setRecentPostId(sortedPosts.get(0).getId());
            }
            List<UserSimpleDto> notFriends = userSimpleDtos.getUserSimpleDtos().stream()
                    .filter(friend -> !isFriend(friend))
                    .sorted(Comparator.comparing(UserSimpleDto::getRecentPostId).reversed())
                    .toList();
            List<UserSimpleDto> friends = userSimpleDtos.getUserSimpleDtos().stream()
                    .filter(this::isFriend)
                    .sorted(Comparator.comparing(UserSimpleDto::getRecentPostId).reversed())
                    .toList();
            sortedFriend = Stream.concat(notFriends.stream(), friends.stream()).toList();
            return new UserFriendResponse(new UserSimpleDtos(sortedFriend));
        }
        return makeUserFriendResponse(userPrincipal); //잘못된 값이 들어갈 경우
    }

    public boolean isFriend(UserSimpleDto userSimpleDto) {
        Friend friend = friendRepository.findById(userSimpleDto.getFriendId()).get();
        return !friend.getStatus();
    }

    public void addFriend(UserPrincipal userPrincipal, Long personId) {
        if (findRelationship(userPrincipal, personId).equals("other")) {
            Friend friend = new Friend();
            friend.setStatus(false);
            friend.setFromUser(userRepository.findById(userPrincipal.getId()).get());
            friend.setToUser(userRepository.findById(personId).get());
            friend.setFromUserNewPost(false);
            friend.setToUserNewPost(false);
            friendRepository.save(friend);
            //User에 저장
            User user = userRepository.findById(userPrincipal.getId()).get();
            User opponent = userRepository.findById(personId).get();
            user.getToFriends().add(friend);
            opponent.getFromFriends().add(friend);
        }
    }

    public void readPost(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(userPrincipal.getId(), personId);
        if (friend != null) {
            friend.setToUserNewPost(false);
        }
        if (friend == null) {
            friend = friendRepository.findByFromUserAndToUser(personId, userPrincipal.getId());
            friend.setFromUserNewPost(false);
        }
        friendRepository.save(friend);
    }

    public void haveNewPost(UserPrincipal userPrincipal, UserFriendResponse userFriendResponse) {
        for (int i = 0; i < userFriendResponse.getUserSimpleDtos().getUserSimpleDtos().size(); i++) {
            Long friendId = userFriendResponse.getUserSimpleDtos().getUserSimpleDtos().get(i).getFriendId();
            Friend friend = friendRepository.getById(friendId);
            if (friend.getFromUser().equals(userPrincipal)) {
                friend.setFromUserNewPost(true);
                friendRepository.save(friend);
                return;
            }
            if (friend.getToUser().equals(userPrincipal)) {
                friend.setToUserNewPost(true);
                friendRepository.save(friend);
            }
        }

    }

    public String findRelationship(UserPrincipal userPrincipal, Long personId) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        User opponent = userRepository.findById(personId).get();
        for (int i = 0; i < user.getFromFriends().size(); i++) {
            if (user.getFromFriends().get(i).getFromUser().equals(opponent)) {
                if (user.getFromFriends().get(i).getStatus()) {
                    return "friend";
                }
                return "friended";
            }
        }
        for (int i = 0; i < user.getToFriends().size(); i++) {
            if (user.getToFriends().get(i).getToUser().equals(opponent)) {
                if (user.getToFriends().get(i).getStatus()) {
                    return "friend";
                }
                return "friending";
            }
        }
        if (userPrincipal.getId().equals(personId)) {
            return "me";
        }
        return "other";
    }

    public void allowFriend(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(userPrincipal.getId(), personId);
        if (friend.getStatus()) {
            return;
        }
        Friend friend1 = new Friend();
        friend1.setStatus(true);
        friend1.setFromUser(userRepository.findById(userPrincipal.getId()).get());
        friend1.setToUser(userRepository.findById(personId).get());
        friend1.setFromUserNewPost(false);
        friend1.setToUserNewPost(false);
        friendRepository.delete(friend);
        friendRepository.save(friend1);
    }

    public void refuseFriend(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(userPrincipal.getId(), personId);
        friendRepository.delete(friend);
    }

    public void deleteFriend(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(userPrincipal.getId(), personId);
        if (friend == null) {
            friend = friendRepository.findByFromUserAndToUser(personId, userPrincipal.getId());
        }
        friendRepository.delete(friend);
    }
}
