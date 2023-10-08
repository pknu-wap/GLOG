/*
 배포시에는 삭제
 */
INSERT INTO user (id, email, email_verified, friend_count, image_url, introduction, nickname, provider, provider_id, skin)
VALUES (1, 'doyeong32@gmail.com', 0, 0, 'https://lh3.googleusercontent.com/a/ACg8ocL0TM05twyPZ0eQsEWouix_zP5Kmz9z6TqY4Pm8VMyxkg=s96-c', NULL, 'Y eong', 'google', 104384823454308011759, 0);

INSERT INTO blog(id, blog_name, blog_url, readme, user_id)
VALUES(1, 'DueIT', 'dueit', NULL, 1);

INSERT INTO category(id, category_name, is_prcategory, reopsitory_url, blog_id)
VALUES(1, 'category1', 0, NULL, 1);

INSERT INTO post(id, blog_url, content, created_at, thumbnail, is_pr, is_private, likes_count, title, views_count, blog_id, category_id, user_id)
VALUES(1, 'dueit', 'It is a post 1', '2023-10-08 13:14:07.377201' , NULL, 0, 0, 0, 'post1', 0, 1, 1, 1),
      (2, 'dueit', 'It is a post 2', '2023-10-08 15:14:07.377201' , NULL, 0, 0, 0, 'post2', 0, 1, 1, 1);

INSERT INTO post_hashtag(id, tag, post_id)
VALUES(1, 'hashtag1', 1), (2, 'hashtag2', 1),
      (3, 'hashtag1', 2), (4, 'hashtag2', 2);

INSERT INTO reply(id, created_at, is_edit, likes_count, message, post_id, user_id)
VALUES(1, '2023-10-08 15:14:07.377201', 0, 0, 'reply1', 1, 1);

INSERT INTO scrap(id, post_id, user_id)
VALUES(1, 1, 1);
