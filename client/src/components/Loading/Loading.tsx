import React from 'react';
import Lottie from 'lottie-react';
import loadingLottie from '../../../public/assets/loadingFootPrint.json';

function Loading() {
  return <Lottie style={{ color: '#e4ba5a' }} color="#e4ba5a" animationData={loadingLottie} />;
}

export default Loading;
