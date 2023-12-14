// import { ICollectContent } from '@/types/dto';
import { MetadataRoute } from 'next';

export const getData = async (id: number) => {
  const res = await fetch(
    `http://glogglogglog-env.eba-fuksumx7.ap-northeast-2.elasticbeanstalk.com/post/previews/likes?page=${id}`,
  );
  return res.json();
};

export default function sitemap(): MetadataRoute.Sitemap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const data: any = getData(0);
  //   const allThePostData: ICollectContent['postPreviewDtos'] = data?.postPreviewDtos;

  //   const sitemapUrls = allThePostData?.map((post) => {
  //     return {
  //       url: `http://15.164.221.35:3000/${post.blogUrl}/home/${post.categoryId}/${post.postId}`,
  //     };
  //   });

  const staticUrls = [
    {
      url: 'http://15.164.221.35:3000',
    },
    {
      url: 'http://15.164.221.35:3000/jkjk',
    },
    {
      url: 'http://15.164.221.35:3000/jkjk/home/5/45',
    },
  ];

  return [...staticUrls];
}
