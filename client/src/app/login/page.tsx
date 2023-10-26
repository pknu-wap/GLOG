// import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '@/constant/common';
// import { Stack } from '@mui/material';
// import React from 'react';

// function page() {
//   return (
// <Stack direction={'row'} marginTop={100} spacing={3}>
//   <a href={GOOGLE_AUTH_URL}>구글</a>
//   <a href={GITHUB_AUTH_URL}>깃허브</a>
// </Stack>
//   );
// }

// export default page;

'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Print from '../../../public/assets/print.svg';
import Cursor from '../../../public/assets/cursor.svg';
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '@/constant/common';
import { Stack } from '@mui/material';

function page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.footPrintWrapper',
        start: 'top top',
        scrub: 1,
        pin: true,
      },
    });

    t1.to('.footPrint', {
      scale: 0.01,
    })
      .to(
        '.footPrint',
        {
          left: '-40%',
          top: '-42.5%',
        },
        '<',
      )
      .to('.description', {
        opacity: 1,
      })
      .to('.cursor', {
        opacity: 1,
      })
      .to('.cursor', {
        top: '6%',
        left: '30%',
      })
      .to(
        '.footPrint',
        {
          top: '-44%',
          left: '-20%',
        },
        '<',
      )
      .to('.cursor', {
        top: '11%',
        left: '39%',
      })
      .to(
        '.footPrint',
        {
          top: '-39%',
          left: '-11%',
        },
        '<',
      );
  }, []);

  return (
    <div className="footPrintWrapper">
      <div className="content">
        <div className="description">드래그하면 파일을 열 수 있어요!</div>
        <div className="footPrint">
          <Print />
        </div>
        <div className="cursor">
          <Cursor />
        </div>
        <Stack direction={'row'} marginTop={100} spacing={3}>
          <a href={GOOGLE_AUTH_URL}>구글</a>
          <a href={GITHUB_AUTH_URL}>깃허브</a>
        </Stack>
      </div>
    </div>
  );
}

export default page;
