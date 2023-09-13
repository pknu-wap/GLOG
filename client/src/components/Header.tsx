'use client';

// import { useRecoilState } from 'recoil';
import classes from './Header.module.css';
// import { userThemeState } from '@/recoil/atom';
// import { oppositeThemeExtraction } from '@/constant/common';
// import { useEffect } from 'react';
import { Stack } from '@mui/material';

export default function Header() {
  // const [userTheme, setUserTheme] = useRecoilState(userThemeState);

  // useEffect(() => {
  //   setUserTheme(userTheme);
  // }, []);

  return (
    <Stack bgcolor="primary.main" className={classes.header_container}>
      <Stack
        onClick={
          () => console.log('adsf')
          // setUserTheme((currentUserTheme) => oppositeThemeExtraction(currentUserTheme))
        }>
        스킨 바꾸기
      </Stack>
    </Stack>
  );
}
