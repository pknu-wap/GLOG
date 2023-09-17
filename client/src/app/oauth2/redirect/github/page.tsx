import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter();

  try {
    // 서버 사이드 렌더링 중에 발생할 수 있는 코드
    // 예를 들어, 데이터 가져오기 등
    console.log(router);
  } catch (error) {
    console.error('프리렌더링 중 오류 발생:', error);
    // 오류 처리 또는 오류 페이지로 리다이렉션
    // 예: router.push('/error');
  }

  return <div>깃허브 성공</div>;
};

export default Page;
