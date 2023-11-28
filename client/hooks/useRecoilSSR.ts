'use client';

import {
  temporaryIdState,
  templateIdState,
  isSidebarOpenState,
  tokenState,
  userThemeState,
  isSearchState,
} from '@/recoil/atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export function useUserThemeSSR() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(userThemeState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? 'light' : value, setValue] as const;
}

export function useSidebarOpenSSR() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(isSidebarOpenState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? true : value, setValue] as const;
}

export function useTokenSSR() {
  const [isInitial, setIsInitial] = useState('');
  const [value, setValue] = useRecoilState(tokenState);

  useEffect(() => {
    setIsInitial('');
  }, []);

  return [isInitial ? '' : value, setValue] as const;
}

export function useTemplateIdSSR() {
  const [isInitial, setIsInitial] = useState(0);
  const [value, setValue] = useRecoilState(templateIdState);

  useEffect(() => {
    setIsInitial(0);
  }, []);

  return [isInitial ? 0 : value, setValue] as const;
}

export function useTemporaryIdSSR() {
  const [isInitial, setIsInitial] = useState(0);
  const [value, setValue] = useRecoilState(temporaryIdState);

  useEffect(() => {
    setIsInitial(0);
  }, []);

  return [isInitial ? 0 : value, setValue] as const;
}

export function useIsSearchSSR() {
  const [isInitial, setIsInitial] = useState(false);
  const [value, setValue] = useRecoilState(isSearchState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? false : value, setValue] as const;
}
