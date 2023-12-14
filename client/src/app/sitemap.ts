// import { useGetCollectDataQuery } from '@/api/collect-api';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  //   const { data } = useGetCollectDataQuery({ kind: 'likes', page: 0 });
  //   const allThePostData = data?.postPreviewDtos;

  //   const sitemapUrls = allThePostData.map((post) => {
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
