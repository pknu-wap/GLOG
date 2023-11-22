'use client';

import { Stack, TextField } from '@mui/material';
import { useUserThemeSSR } from '../../../../hooks/useRecoilSSR';
import { useState } from 'react';
import { ToolBar } from '../Write.style';
import TagList from '../TagList';
import TopButton from '../Top/TopButton';
import MDEditor from '@uiw/react-md-editor';
import BottomButton from '../Bottom/BottomButton';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { WriteProps } from '@/util/useWriteProps';

const Write = () => {
  const [userTheme] = useUserThemeSSR();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string | undefined>('# Hello World');
  const [tags, setTags] = useState<string[]>([]);

  const writeProps: WriteProps = {
    title,
    content,
    tags,
  };

  return (
    <Stack mt={10} spacing={4} data-color-mode={userTheme}>
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
      <BottomButton writeProps={writeProps} />
    </Stack>
  );
};

export default Write;
