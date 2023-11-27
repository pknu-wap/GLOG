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
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        UserSimpleDtos userSimpleDtos = makeUserSimpleDtos(userPrincipal);
        Comparator<UserSimpleDto> friendIdComparator =
                Comparator.comparing(UserSimpleDto::getFriendId).reversed();
        userSimpleDtos = new UserSimpleDtos(makeSortedFriends(userSimpleDtos, friendIdComparator));
        UserFriendResponse userFriendResponse = new UserFriendResponse(userSimpleDtos);
        saveUserFriendCount(userPrincipal, userFriendResponse);
        return userFriendResponse;
    }

    private UserSimpleDtos makeUserSimpleDtos(UserPrincipal userPrincipal) {
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
        setUserSimpleDtosRecentPostId(userSimpleDtos);
        List<UserSimpleDto> notFriends = userSimpleDtos.getSimpleDtos().stream()
                .filter(friend -> !isFriend(friend))
                .filter(dto -> containsUser(users, dto.getUserId()))
                .toList();
        List<UserSimpleDto> friends = userSimpleDtos.getSimpleDtos().stream()
                .filter(this::isFriend)
                .filter(dto -> containsUser(users, dto.getUserId()))
                .toList();
        UserSimpleDtos userSimpleDtosByName = new UserSimpleDtos(Stream
                .concat(notFriends.stream(), friends.stream()).toList());

        UserFriendResponse userFriendResponse = new UserFriendResponse(userSimpleDtosByName);
        saveUserFriendCount(userPrincipal, userFriendResponse);
        return userFriendResponse;
    }

    private void saveUserFriendCount(UserPrincipal userPrincipal, UserFriendResponse userFriendResponse) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        user.setFriendCount(userFriendResponse.getRealFriendCount());
        userRepository.save(user);
    }

    private boolean containsUser(List<User> users, Long userId) {
        return users.stream().anyMatch(user -> user.getId().equals(userId));
    }

    public UserFriendResponse sortUserFriendResponse(UserPrincipal userPrincipal, String kind) {
        UserSimpleDtos userSimpleDtos = makeUserSimpleDtos(userPrincipal);
        setUserSimpleDtosRecentPostId(userSimpleDtos);
        UserFriendResponse userFriendResponse = ifKindIsRecentFriend(kind, userSimpleDtos);
        if (userFriendResponse != null) {
            saveUserFriendCount(userPrincipal, userFriendResponse);
            return userFriendResponse;
        }
        userFriendResponse = ifKindIsName(kind, userSimpleDtos);
        if (userFriendResponse != null) {
            saveUserFriendCount(userPrincipal, userFriendResponse);
            return userFriendResponse;
        }
        userFriendResponse = ifKindIsRecentPost(kind, userSimpleDtos);
        if (userFriendResponse != null) {
            saveUserFriendCount(userPrincipal, userFriendResponse);
            return userFriendResponse;
        }
        return makeUserFriendResponse(userPrincipal); //잘못된 값이 들어갈 경우
    }

    private UserFriendResponse ifKindIsRecentFriend(String kind, UserSimpleDtos userSimpleDtos) {
        if (kind.equals("recentFriend")) {
            Comparator<UserSimpleDto> friendIdComparator =
                    Comparator.comparing(UserSimpleDto::getFriendId).reversed();
            return new UserFriendResponse(new UserSimpleDtos(makeSortedFriends(userSimpleDtos, friendIdComparator)));
        }
        return null;
    }

    private UserFriendResponse ifKindIsName(String kind, UserSimpleDtos userSimpleDtos) {
        if (kind.equals("name")) {
            Comparator<UserSimpleDto> nicknameComparator =
                    Comparator.comparing(UserSimpleDto::getNickname, String.CASE_INSENSITIVE_ORDER);
            return new UserFriendResponse(new UserSimpleDtos(makeSortedFriends(userSimpleDtos, nicknameComparator)));
        }
        return null;
    }

    private UserFriendResponse ifKindIsRecentPost(String kind, UserSimpleDtos userSimpleDtos) {
        if (kind.equals("recentPost")) {
            Comparator<UserSimpleDto> recentPostComparator =
                    Comparator.comparing(UserSimpleDto::getRecentPostId).reversed();
            return new UserFriendResponse(new UserSimpleDtos(makeSortedFriends(userSimpleDtos, recentPostComparator)));
        }
        return null;
    }

    private void setUserSimpleDtosRecentPostId(UserSimpleDtos userSimpleDtos) {
        for (int i = 0; i < userSimpleDtos.getSimpleDtos().size(); i++) {
            List<Post> posts =
                    postRepository.findAllByUser(userRepository
                            .findById(userSimpleDtos.getSimpleDtos().get(i).getUserId()).get());
            if (posts.isEmpty()) {
                userSimpleDtos.getSimpleDtos().get(i).setRecentPostId(0L);
                continue;
            }
            List<Post> sortedPosts =
                    posts.stream().sorted(Comparator.comparing(Post::getId).reversed()).toList();
            userSimpleDtos.getSimpleDtos().get(i).setRecentPostId(sortedPosts.get(0).getId());
        }
    }

    private List<UserSimpleDto> makeSortedFriends(UserSimpleDtos userSimpleDtos, Comparator<UserSimpleDto> comparator) {
        List<UserSimpleDto> notFriends = userSimpleDtos.getSimpleDtos().stream()
                .filter(friend -> !isFriend(friend))
                .sorted(comparator)
                .toList();
        List<UserSimpleDto> friends = userSimpleDtos.getSimpleDtos().stream()
                .filter(this::isFriend)
                .sorted(comparator)
                .toList();
        return Stream.concat(notFriends.stream(), friends.stream()).toList();
    }

    private boolean isFriend(UserSimpleDto userSimpleDto) {
        Friend friend = friendRepository.findById(userSimpleDto.getFriendId()).get();
        return friend.getStatus();
    }

    public void addFriend(UserPrincipal userPrincipal, Long personId) {
        if (findRelationship(userPrincipal, personId).equals("other")) {
            saveFriendInUser(userPrincipal, personId, makeAndSaveFriendEntity(userPrincipal.getId(), personId));
        }
    }

    private void saveFriendInUser(UserPrincipal userPrincipal, Long personId, Friend friend) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        User opponent = userRepository.findById(personId).get();
        user.getToFriends().add(friend);
        opponent.getFromFriends().add(friend);
    }

    public void readPost(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(userPrincipal.getId(), personId);
        if (friend != null) {
            friend.setToUserNewPost(false);
        }
        if (friend == null) {
            friend = friendRepository.findByFromUserAndToUser(personId, userPrincipal.getId());
            if (friend == null) {
                return;
            }
            friend.setFromUserNewPost(false);
        }
        friendRepository.save(friend);
    }

    public void haveNewPost(UserPrincipal userPrincipal, UserFriendResponse userFriendResponse) {
        for (int i = 0; i < userFriendResponse.getUserSimpleDtos().getSimpleDtos().size(); i++) {
            Long friendId = userFriendResponse.getUserSimpleDtos().getSimpleDtos().get(i).getFriendId();
            Friend friend = friendRepository.getById(friendId);
            if (!friend.getStatus()) {
                continue;
            }
            User user = userRepository.findById(userPrincipal.getId()).get();
            if (friend.getFromUser().equals(user)) {
                friend.setFromUserNewPost(true);
                friendRepository.save(friend);
                continue;
            }
            if (friend.getToUser().equals(user)) {
                friend.setToUserNewPost(true);
                friendRepository.save(friend);
            }
        }
    }

    private String findRelationship(UserPrincipal userPrincipal, Long personId) {
        User user = userRepository.findById(userPrincipal.getId()).get();
        User opponent = userRepository.findById(personId).get();

        String relationship = findRelationshipByFromFriends(user, opponent);
        if (relationship != null) {
            return relationship;
        }
        relationship = findRelationshipByToFriends(user, opponent);
        if (relationship != null) {
            return relationship;
        }
        if (userPrincipal.getId().equals(personId)) {
            return "me";
        }
        return "other";
    }

    private String findRelationshipByToFriends(User user, User opponent) {
        for (int index = 0; index < user.getToFriends().size(); index++) {
            if (user.getToFriends().get(index).getToUser().equals(opponent)) {
                return checkIsFriendByToFriends(user, index);
            }
        }
        return null;
    }

    private String checkIsFriendByToFriends(User user, int index) {
        if (user.getToFriends().get(index).getStatus()) {
            return "friend";
        }
        return "friending";
    }

    private String findRelationshipByFromFriends(User user, User opponent) {
        for (int index = 0; index < user.getFromFriends().size(); index++) {
            if (user.getFromFriends().get(index).getFromUser().equals(opponent)) {
                return checkIsFriendByFromFriends(user, index);
            }
        }
        return null;
    }

    private String checkIsFriendByFromFriends(User user, int i) {
        if (user.getFromFriends().get(i).getStatus()) {
            return "friend";
        }
        return "friended";
    }

    public void allowFriend(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(personId, userPrincipal.getId());
        if (friend == null) {
            return;
        }
        if (friend.getStatus()) {
            return;
        }
        friendRepository.delete(friend);
        Friend friend1 = makeAndSaveFriendEntity(personId, userPrincipal.getId());
        friend1.setStatus(true);
        friendRepository.save(friend1);
    }

    private Friend makeAndSaveFriendEntity(Long userId, Long personId) {
        Friend friend = new Friend();
        friend.setStatus(false);
        friend.setFromUser(userRepository.findById(userId).get());
        friend.setToUser(userRepository.findById(personId).get());
        friend.setFromUserNewPost(false);
        friend.setToUserNewPost(false);
        friendRepository.save(friend);
        return friend;
    }

    public void refuseFriend(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(personId, userPrincipal.getId());
        friendRepository.delete(friend);
    }

    public void deleteFriend(UserPrincipal userPrincipal, Long personId) {
        Friend friend = friendRepository.findByFromUserAndToUser(userPrincipal.getId(), personId);
        if (friend == null) {
            friend = friendRepository.findByFromUserAndToUser(personId, userPrincipal.getId());
        }
        if (friend == null) {
            return;
        }
        friendRepository.delete(friend);
        User user = userRepository.findById(userPrincipal.getId()).get();
        User opponent = userRepository.findById(personId).get();
        user.setFriendCount(user.getFriendCount() - 1);
        opponent.setFriendCount(opponent.getFriendCount() - 1);
    }

    public Long findUserIdByName(String nickname) {
        return userRepository.findUserByNickname(nickname).getId();
    }
}
