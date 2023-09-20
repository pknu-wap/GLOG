'use client';

import { useRecoilState } from 'recoil';
import classes from './header.module.css';
import { isSidebarOpenState, userThemeState } from '@/recoil/atom';
import { oppositeThemeExtraction } from '@/constant/common';
import { useEffect } from 'react';
import { Stack } from '@mui/material';

export default function Header() {
  const [userTheme, setUserTheme] = useRecoilState(userThemeState);
  const [open, setOpen] = useRecoilState(isSidebarOpenState);

  useEffect(() => {
    setUserTheme(userTheme);
  }, []);

  return (
    <Stack bgcolor="primary.main" className={classes.header_container}>
      <Stack
        onClick={() =>
          setUserTheme((currentUserTheme) => oppositeThemeExtraction(currentUserTheme))
        }>
        스킨 바꾸기
      </Stack>
      <Stack onClick={() => setOpen(!open)}>사이드바 여닫히기</Stack>
    </Stack>
  );
}
