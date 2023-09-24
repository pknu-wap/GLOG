import React from 'react';

function page({ params }: { params: { titleId: string; postId: string } }) {
  return (
    <>
      <div>{params.titleId}</div>
      <div>{params.postId}</div>
    </>
  );
}

export default page;
