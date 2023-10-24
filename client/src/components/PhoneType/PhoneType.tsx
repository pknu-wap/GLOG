'use client';

import { ReactNode, useEffect } from 'react';
import { useAndroidSSR, useIphoneSSR } from '../../../hooks/useRecoilSSR';

function PhoneType({ children }: { children: ReactNode }) {
  const [, setIos] = useIphoneSSR();
  const [, setAndroid] = useAndroidSSR();

  useEffect(() => {
    setIos(navigator.userAgent.match(/iOS_App/i) ? true : false);
    setAndroid(navigator.userAgent.match(/Android_App/i) ? true : false);
  }, []);

  return <>{children}</>;
}

export default PhoneType;
