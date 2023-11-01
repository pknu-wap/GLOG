import React from 'react';
import Lottie from 'lottie-react';
import loadingLottie from '../../../public/assets/loadingFootPrint.json';

function Loading() {
  return <Lottie animationData={loadingLottie} />;
}

export default Loading;
