/*
 배포시에는 삭제
 */
INSERT INTO user (id, email, email_verified, friend_count, image_url, introduction, nickname, provider, provider_id, skin)
VALUES (1, 'doyeong32@gmail.com', 0, 0, 'https://lh3.googleusercontent.com/a/ACg8ocL0TM05twyPZ0eQsEWouix_zP5Kmz9z6TqY4Pm8VMyxkg=s96-c', NULL, 'Y eong', 'google', 104384823454308011759, 0);

INSERT INTO blog(id, blog_name, blog_url, readme, user_id)
VALUES(1, 'DueIT', 'dueit', NULL, 1);

INSERT INTO category(id, category_name, is_prcategory, reopsitory_url, blog_id)
VALUES(1, 'category1', 0, NULL, 1);

INSERT INTO post(id, blog_url, content, created_at, image_url, is_pr, is_private, likes_count, title, views_count, blog_id, category_id, user_id)
VALUES(1, 'dueit', 'It is a post 1', 2023-10-08 13:14:07.377201 , NULL, 0, 0, 0, 'post1', 0, 1, 1, 1),
      (2, 'dueit', 'It is a post 2', 2023-10-08 15:14:07.377201 , NULL, 0, 0, 0, 'post1', 0, 1, 1, 1);
