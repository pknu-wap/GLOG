/*
배포시에는 삭제
 */
INSERT INTO user (id, email, email_verified, friend_count, image_url, introduction, nickname, provider, provider_id, skin)
VALUES (1, 'doyeong32@gmail.com', 0, 0, 'https://lh3.googleusercontent.com/a/ACg8ocL0TM05twyPZ0eQsEWouix_zP5Kmz9z6TqY4Pm8VMyxkg=s96-c', NULL, 'Y eong', 'google', 104384823454308011759, 0),
       (2, 'yiyop@naver.com', 0, 0, 'https://avatars.githubusercontent.com/u/48638700?v=4', NULL, 'Due_it', 'github', 48638700, 0),
       (3,	'oo7bangjk@gmail.com', 0, 0, 'https://lh3.googleusercontent.com/a/ACg8ocISaV9dG1q60VmzjW0_pxYAYYVg8T2-cVmGmxhmdNaRz4k=s96-c' , NULL, 'jk', 'google' ,105693697773599263104, 0);

INSERT INTO blog(id, blog_name, blog_url, readme, user_id)
VALUES(1, 'DueIT', 'dueit', '두영님 리드미', 1),
      (2, 'Blog2', 'blog2', NULL, 2),
      (3, 'jkjk', 'jkjk', NULL, 3);

INSERT INTO guest_book(id, blog_id, user_id)
VALUES(1, 1, 1),
      (2, 2, 2);

INSERT INTO book_message(id, created_at, message, guest_book_id, user_id)
VALUES(1, '2023-11-01 12:39:35.630800', 'hello', 1, 1),
      (2, '2023-11-01 12:39:35.630800', 'hello', 2, 2);


INSERT INTO category(id, category_name, is_prcategory, reopsitory_url, blog_id)
VALUES(1, 'category1', 0, NULL, 1),
      (2, 'category2', 0, NULL, 3);

INSERT INTO post(id, blog_url, content, created_at, thumbnail, is_pr, is_private, likes_count, title, views_count, blog_id, category_id, user_id)
VALUES(1, 'dueit', 'It is a post 1', '2023-10-08 13:14:07.377201' , NULL, 0, 0, 0, 'post1', 0, 1, 1, 1),
      (2, 'dueit', 'It is a post 2', '2023-10-08 15:14:07.377201' , NULL, 0, 0, 0, 'post2', 0, 1, 1, 1),
      (3, 'ㅎㅎㅎㅎ', 'It is a post 1', '2023-10-08 13:14:07.377201' , NULL, 1, 0, 0, 'post3', 0, 3, 2, 3),
      (4, 'ㅋㅋㅋㅋ', 'It is a post 1', '2023-10-08 13:14:07.377201' , NULL, 1, 0, 0, 'post4', 0, 3, 2, 3),
      (5, 'ㅋㅋㅋㅋ', 'It is a post 1', '2023-10-08 13:14:07.377201' , NULL, 1, 0, 0, 'post4', 0, 3, 2, 3);

INSERT INTO post_hashtag(id, tag, post_id)
VALUES(1, 'hashtag1', 1), (2, 'hashtag2', 1),
      (3, 'hashtag1', 2), (4, 'hashtag2', 2);

INSERT INTO post_like(id, post_id, user_id)
VALUES(1, 1, 1), (2, 1, 2);

INSERT INTO reply(id, created_at, is_edit, likes_count, message, post_id, user_id)
VALUES(1, '2023-10-08 15:14:07.377201', 0, 0, 'reply1', 1, 1);

INSERT INTO scrap(id, post_id, user_id)
VALUES(1, 1, 1);

INSERT INTO history(id, date, count ,user_id)
VALUES (1,'2023-10-01',1,3),(2,'2023-10-11',1,3),(3,'2023-10-23',2,3),(4,'2023-10-25',3,3),(5,'2023-10-29',1,3),
       (6,'2023-10-30',1,3),(7,'2023-11-01',1,3),(8,'2023-10-01',1,1),(9,'2023-10-11',1,1),(10,'2023-10-23',3,1),(11,'2023-10-25',1,1),(12,'2023-10-29',2,1),
       (13,'2023-10-30',1,1),(14,'2023-11-01',3,1);

-- INSERT INTO pr_post(id, is_posted,pr_number,pr_title,category_id,post_id)
-- VALUES (1,1,"#1","ㅎㅇㅎㅇ",1,1),
--        (2,1,"#3","ㅎㅇㅎㅇ",2,3),
--        (3,0,"#4","ㅎㅇㅎㅇ",2,4),
--        (4,1,"#6","ㅎㅇㅎㅇ",2,5);

INSERT INTO alarm(id, checked, created_at, message, referenced_id, type, user_id)
VALUES(1, 0, '2023-11-21 13:56:31.507319', '게시글에 댓글이 달렸습니다.', 1, 'reply', 1);

