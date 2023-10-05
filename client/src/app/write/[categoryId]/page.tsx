'use client';

import type { NextPage } from 'next';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { userThemeState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import { ToolBar } from '../Write.style';
import TagList from '../TagList';
import BottomButton from './Bottom/BottomButton';
import TopButton from './Top/TopButton';
import { WritePropsContext } from '@/util/useWriteProps';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Write: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string | undefined>('# Hello World');
  const [tags, setTags] = useState<string[]>([]);
  const userTheme = useRecoilValue(userThemeState);

  const state = useMemo(() => ({ content, title, tags }), [content, title, tags]);

  return (
    <WritePropsContext.Provider value={state}>
      <Stack spacing={4} data-color-mode={userTheme}>
        <TextField
          sx={{ width: '30%' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="standard"
          placeholder="제목을 입력해주세요."
        />
        <ToolBar>
          <TagList editTagArray={(newValue) => setTags(newValue)} tagArray={tags} />
          <TopButton />
        </ToolBar>
        <MDEditor height="68vh" value={content} onChange={setContent} />
        <BottomButton />
      </Stack>
    </WritePropsContext.Provider>
  );
};

export default Write;
