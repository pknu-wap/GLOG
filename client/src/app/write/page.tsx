'use client';

import type { NextPage } from 'next';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { userThemeState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import { ToolBar } from './Write.style';
import TagList from './TagList';
import BottomButton from './Bottom/BottomButton';
import TopButton from './Top/TopButton';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Write: NextPage = () => {
  const [content, setContent] = useState<string | undefined>('# Hello World');
  const [tagArray, setTagArray] = useState<string[]>([]);
  const userTheme = useRecoilValue(userThemeState);

  return (
    <Stack spacing={4} data-color-mode={userTheme}>
      <TextField sx={{ width: '30%' }} variant="standard" placeholder="제목을 입력해주세요." />
      <ToolBar>
        <TagList editTagArray={(newValue) => setTagArray(newValue)} tagArray={tagArray} />
        <TopButton />
      </ToolBar>
      <MDEditor height="68vh" value={content} onChange={setContent} />
      <BottomButton />
    </Stack>
  );
};

export default Write;
