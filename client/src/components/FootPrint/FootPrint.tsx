import React from 'react';
import YellowFootPrint from '../../../public/assets/oneFootPrint.svg';
import { FootPrintStyle } from './FootPrint.style';

function FootPrint({ width, height, fill }: { width?: number; height?: number; fill?: boolean }) {
  return (
    <FootPrintStyle
      src={YellowFootPrint}
      alt="yellowfootPrint"
      fill={fill}
      width={width}
      height={height}
    />
  );
}

export default FootPrint;
