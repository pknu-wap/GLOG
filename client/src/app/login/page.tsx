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

const ThreeScene: React.FC = () => {
  const sceneRef = useRef<HTMLCanvasElement | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const gltfLoader = new GLTFLoader();

  const init = async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
    const gui = new GUI();
    // 카메라 포지션도 옮겨줌
    // camera.position.z = 5;
    camera.position.set(0, 25, 150);

    // 숫자 크기를 높이니까 정점이 엄청 많아짐
    const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
    // wireframe에 선이 없으면 검정화면인데, 선이 생기니까 검정선이 생김
    const waveMaterial = new THREE.MeshStandardMaterial({
      // wireframe: true,
      color: '#00ffff',
    });

    const waveHeight = 2.5;
    const initialZPositions: number[] = [];

    // 1. 파도 생성
    // 정점이 나와있음
    // console.log(waveGeometry.attributes.position);
    // for (let i = 0; i < waveGeometry.attributes.position.array.length; i += 3) {
    //   // z 좌표가 전부 다르게 설정되게 됨 (0.5~-0.5) 에다가 파도의 높이 5만큼 설정
    //   waveGeometry.attributes.position.array[i + 2] += (Math.random() - 0.5) * waveHeight;
    // }

    // 1-1. 파도 생성 다른 방법
    for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
      // z 좌표가 전부 다르게 설정되게 됨 (0.5~-0.5) 에다가 파도의 높이 5만큼 설정
      const z = waveGeometry.attributes.position.getZ(i) + (Math.random() - 0.5) * waveHeight;

      waveGeometry.attributes.position.setZ(i, z);
      initialZPositions.push(z);
    }

    const wave = new THREE.Mesh(waveGeometry, waveMaterial);

    const waveUpdate = () => {
      const elapsedTime = clock.getElapsedTime();

      for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
        const z = initialZPositions[i] + Math.sin(elapsedTime * 3 + i ** 2) + waveHeight;

        waveGeometry.attributes.position.setZ(i, z);
      }

      waveGeometry.attributes.position.needsUpdate = true;
    };

    // x 축으로 기울여줌
    wave.rotation.x = -Math.PI / 2;
    wave.receiveShadow = true;
    scene.add(wave);

    // public 폴더에 넣었어야했음
    const gltf = await gltfLoader.loadAsync('./scene.gltf');

    const ship = gltf.scene;

    ship.castShadow = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ship.traverse((object: any) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    const shipUpdate = () => {
      const elapsedTime = clock.getElapsedTime();

      ship.position.y = Math.sin(elapsedTime * 3);
    };

    // 180도 만큼 돌림
    ship.rotation.y = Math.PI;

    // 배 크기 키움
    ship.scale.set(40, 40, 40);

    scene.add(ship);

    // 빛 추가 해줌
    const pointLight = new THREE.PointLight(0xffffff, 1);

    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.radius = 10;
    pointLight.position.set(15, 15, 15);
    scene.add(pointLight);

    // 안개 추가 해줌
    scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);

    // gui.add(scene.fog, 'near').min(0).max(100).step(0.1);

    // gui.add(scene.fog, 'far').min(100).max(500).step(0.1);

    // 빛 추가
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 10;

    directionalLight.position.set(-15, 15, 15);

    scene.add(directionalLight);

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

      renderer.current = newRenderer;
    }

    // fps마다 다르게 보일 수 있는데, 해상도 별로가 아닌 시간별로 보일 수 있도록 해줌
    const clock = new THREE.Clock();

    function render() {
      waveUpdate();
      shipUpdate();

      // 카메라가 배를 향하도록
      camera.lookAt(ship.position);

      renderer.current?.render(scene, camera);
      requestAnimationFrame(render);
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.current?.setSize(window.innerWidth, window.innerHeight);
      renderer.current?.render(scene, camera);
    }

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  useEffect(() => {
    init();
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
