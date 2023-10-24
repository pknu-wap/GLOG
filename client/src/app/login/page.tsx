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

const ThreeScene: React.FC = () => {
  const sceneRef = useRef<HTMLCanvasElement | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    // Create a Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

    // 카메라 포지션도 옮겨줌
    // camera.position.z = 5;
    camera.position.set(0, 25, 150);

    if (sceneRef.current) {
      // Create a Three.js renderer
      const newRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: sceneRef.current,
      });

      // 캔버스에다가 색상 입히는 것, 뒤에 숫자 넣으면 투명도
      // newRenderer.setClearColor('#d9d9d9', 0.5);
      newRenderer.setSize(window.innerWidth, window.innerHeight);

      // 숫자 크기를 높이니까 정점이 엄청 많아짐
      const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
      // wireframe에 선이 없으면 검정화면인데, 선이 생기니까 검정선이 생김
      const waveMaterial = new THREE.MeshStandardMaterial({
        wireframe: true,
        color: '#00ffff',
      });

      const wave = new THREE.Mesh(waveGeometry, waveMaterial);

      // x 축으로 기울여줌
      wave.rotation.x = -Math.PI / 2;
      scene.add(wave);

      // 빛 추가 해줌
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(15, 15, 15);
      scene.add(pointLight);

      renderer.current = newRenderer;
    }

    function render() {
      if (renderer.current) {
        renderer.current.render(scene, camera);
        requestAnimationFrame(render);
      }
    }

    function handleResize() {
      if (renderer.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        renderer.current.render(scene, camera);
      }
    }

    window.addEventListener('resize', handleResize);
    render();

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas id="canvas" ref={sceneRef}></canvas>
      {/* wrapper div는 캔버스가 html 요소보다 뒷쪽에 있게 도와줌 (relative 속성을 통해서) */}
      <div className="wrapper">
        <header>
          <h1 className="title">Three.js interactive Web</h1>
        </header>
      </div>
    </>
  );
};

export default ThreeScene;
