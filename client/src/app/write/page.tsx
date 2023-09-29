'use client';

import type { NextPage } from 'next';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { userThemeState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Button/Button';
import { FooterButton, ToolBar, TopButton } from './Write.style';
import TagList from './TagList';
import TempSaveModal from './TempSaveModal';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Write: NextPage = () => {
  const [content, setContent] = useState<string | undefined>('# Hello World');
  const [tagArray, setTagArray] = useState<string[]>([]);
  const userTheme = useRecoilValue(userThemeState);
  const [tempSaveOpen, setTempSaveOpen] = useState<boolean>(false);

  return (
    <Stack spacing={4} data-color-mode={userTheme}>
      <TextField sx={{ width: '30%' }} variant="standard" placeholder="제목을 입력해주세요." />
      <ToolBar>
        <TagList editTagArray={(newValue) => setTagArray(newValue)} tagArray={tagArray} />
        <TopButton>
          <Button sx={{ width: '130px' }} onClick={() => setTempSaveOpen(true)}>
            임시저장 불러오기
          </Button>
          <Button sx={{ width: '130px' }}>템플릿 불러오기</Button>
        </TopButton>
      </ToolBar>
      <MDEditor height="68vh" value={content} onChange={setContent} />
      <FooterButton>
        <Button>임시저장 저장</Button>
        <Button>템플릿 저장</Button>
        <Button>글 저장</Button>
      </FooterButton>
      <TempSaveModal open={tempSaveOpen} onClose={() => setTempSaveOpen(false)} />
    </Stack>
  );
};

export default Write;
