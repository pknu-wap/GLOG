import React from 'react';
import YellowFootPrint from '../../../public/assets/oneFootPrint.svg';
import { FootPrintStyle } from './FootPrint.style';

function FootPrint({ width, height }: { width: number; height: number }) {
  return (
    <FootPrintStyle src={YellowFootPrint} alt="yellowfootPrint" width={width} height={height} />
  );
}

export default FootPrint;
