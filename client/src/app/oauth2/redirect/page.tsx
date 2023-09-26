'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.log(error);
    }
  }, [params]);

  return <div>일반 성공</div>;
};

export default Page;
