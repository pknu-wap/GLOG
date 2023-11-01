import React from 'react';
import YellowFootPrint from '../../../public/assets/oneFootPrint.svg';

function FootPrint({ width, height, fill }: { width?: number; height?: number; fill?: boolean }) {
  return (
    // <FootPrintStyle
    //   src={YellowFootPrint}
    //   alt="yellowfootPrint"
    //   fill={fill}
    //   width={width}
    //   height={height}
    // />
    <YellowFootPrint width={width} height={height} color={fill} />
  );
}

export default FootPrint;
