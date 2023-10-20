'use client';

import React, { useState, useEffect } from 'react';
import YellowFootPrint from '../../../public/assets/oneFootPrint.svg';
import { FootPrintStyle } from './FootPrint.style';

function FootPrint({ width, height }: { width: number; height: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 5000); // 5초마다 실행

    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <FootPrintStyle src={YellowFootPrint} alt="yellowfootPrint" width={width} height={height} />
  );
}

export default FootPrint;
