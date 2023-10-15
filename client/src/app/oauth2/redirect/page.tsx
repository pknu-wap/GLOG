'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const params = useSearchParams();

  useEffect(() => {
    const getTokenValue = params.get('token');
    const error = params.get('error');

    if (getTokenValue) {
      localStorage.setItem('token', getTokenValue);
    } else {
      console.log(error);
    }
  }, [params]);

  return <div>일반 성공</div>;
};

export default Page;
