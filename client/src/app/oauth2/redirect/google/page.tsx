/* app/blog/[slug]/page.tsx */
'use client';

import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
  const router = useRouter();

  console.log(router);

  return <div>구글 성공</div>;
};

export default Page;
