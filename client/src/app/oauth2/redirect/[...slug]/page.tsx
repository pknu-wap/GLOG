/* app/blog/[slug]/page.tsx */
import React from 'react';

// interface Post {
//   createdAt: string;
//   name: string;
//   avatar: string;
//   slug: string;
// }

interface TokenPageProps {
  params: { slug: string[] };
}

// export async function generateStaticParams() {
//   const posts: Post[] = await fetch(`${process.env.MOCK_API_URL}/posts`).then((res) => res.json());

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = ({ params }: TokenPageProps) => {
  return <div>{JSON.stringify(params.slug[0])}</div>;
};

export default Page;
