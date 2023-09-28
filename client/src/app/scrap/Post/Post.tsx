import React from 'react';
import { CostomizeButton, Icon, Image, Post, PostPopular, Thumbnail, Title } from './Post.style';
import { PostComponentType } from './Post.type';
import Script from 'next/script';

// 스크랩 별 클릭 되었을 때 빈 별로 바뀌는 기능 추가해야함
// <i class="fa-light fa-star"></i>
function PostComponent({ thumbnail, title, likesCount, viewsCount, isPrivate }: PostComponentType) {
  return (
    <Post href="#">
      <Thumbnail>
        <PostPopular>
          <Icon className="fa-regular fa-heart"></Icon>
          &nbsp;{likesCount}&nbsp;&nbsp;&nbsp;
          <Icon className="fa-regular fa-eye"></Icon>
          &nbsp;{viewsCount}
        </PostPopular>
        <Image alt="" src={thumbnail} />
        <CostomizeButton>
          <Icon className="fa-solid fa-star"></Icon>
        </CostomizeButton>
      </Thumbnail>
      <Title>{title}</Title>
      {isPrivate && (
        <Script src="https://kit.fontawesome.com/fe09364908.js" crossOrigin="anonymous"></Script>
      )}
    </Post>
  );
}

export default PostComponent;
