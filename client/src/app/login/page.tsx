// import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '@/constant/common';
// import { Stack } from '@mui/material';
// import React from 'react';

// function page() {
//   return (
//     <Stack direction={'row'} marginTop={100} spacing={3}>
//       <a href={GOOGLE_AUTH_URL}>구글</a>
//       <a href={GITHUB_AUTH_URL}>깃허브</a>
//     </Stack>
//   );
// }

// export default page;

'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FootPrintStyle } from '@/components/FootPrint/FootPrint.style';
import FootPrint from '@/components/FootPrint/FootPrint';

function page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const params = {
      waveColor: '#00ffff',
      backgroundColor: '#ffffff',
      fogColor: '#f0f0f0',
    };

    // 이전 거의 다음 순서대로 갈 수 있도록 함
    // const t1 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.wrapper',
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     // markers: true,
    //     scrub: true,
    //   },
    // });

    // t1.to(params, {
    //   waveColor: '#4268ff',
    //   onUpdate: () => {
    //     waveMaterial.color = new THREE.Color(params.waveColor);
    //   },
    // })
    //   .to(
    //     params,
    //     {
    //       backgroundColor: '#2a2a2a',
    //       onUpdate: () => {
    //         scene.background = new THREE.Color(params.backgroundColor);
    //       },
    //     },
    //     '<',
    //   )
    //   .to(
    //     params,
    //     {
    //       fogColor: '#2f2f2f',
    //       onUpdate: () => {
    //         scene.fog.color = new THREE.Color(params.fogColor);
    //       },
    //       // <  = 바로 앞단계랑 같이 실행됨
    //     },
    //     '<',
    //   )
    //   .to(
    //     camera.position,
    //     {
    //       x: 100,
    //       z: -50,
    //     },
    //     '<',
    //   )
    //   .to(ship.position, {
    //     z: 150,
    //     duration: 2,
    //   })
    //   .to(camera.position, {
    //     x: -50,
    //     y: 25,
    //     z: 100,
    //     duration: 2,
    //   })
    //   .to(camera.position, {
    //     x: 0,
    //     y: 50,
    //     z: 300,
    //     duration: 2,
    //   });

    // const t1 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.wrapper',
    //     scrub: true,
    //     pin: true,
    //     end: '+=1000',
    //   },
    // });

    //     t1.to('.title', {
    //       opacity: 0,
    //     }).to('.footPrint', {
    //       width: '100px',
    //       height: '100px',
    //     });

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.footPrintWrapper',
        start: 'top top',
        end: 'bottom bottom',
        markers: true,
        scrub: 1,
        pin: true,
      },
    });

    t1.to('.circle', {
      scale: 0.05,
      //   width: '30%',
      //   height: '30%',
      borderRadius: '100%',
      backgroundColor: 'transparent',
    })
      .to(
        '.content',
        {
          opacity: 1,
        },
        '<',
      )
      .to(
        '.header',
        {
          //   opacity: 0,
        },
        '<',
      )
      .to('.circle', {
        left: '-40%',
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="footPrintWrapper">
        <div className="content">
          <img alt="footprint" src={'/assets/yellowFootPrint.png'} className="circle"></img>
          {/* <div className="circle">
            <h1 className="header">GLOG</h1>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default page;
