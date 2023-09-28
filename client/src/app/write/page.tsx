'use client';

import type { NextPage } from 'next';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Chip, Stack, TextField } from '@mui/material';
import { userThemeState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Button/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Write: NextPage = () => {
  const [md, setMd] = useState<string | undefined>('# Hello World');
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [tag, setTag] = useState('');
  const userTheme = useRecoilValue(userThemeState);
  const theme = useTheme();

  return (
    <Stack
      spacing={4}
      data-color-mode={userTheme}
      style={{ height: '100%', paddingBottom: '24px' }}>
      <Stack spacing={4}>
        <TextField sx={{ width: '30%' }} variant="standard" placeholder="제목을 입력해주세요." />
        <Stack spacing={4} direction="row" justifyContent="space-between">
          <Stack spacing={1} width="100%" overflow="scroll" gap="4px" color="white" direction="row">
            {tagArray.map((tag, i) => (
              <Chip
                key={i}
                color="primary"
                label={`# ${tag}`}
                deleteIcon={<CancelIcon />}
                onDelete={() => setTagArray(tagArray.filter((tag, index) => index !== i))}
              />
            ))}
            <input
              placeholder="태그를 입력해주세요"
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.code === 'Space') {
                  if (tagArray.length <= 10) {
                    if (!tag.includes('#')) {
                      setTagArray([...tagArray, tag]);
                      setTag('');
                    } else {
                      setTag('');
                      // setSnackbarOpen(true);
                      // setToastMessage('태그에 `#`은 포함될 수 없습니다.');
                    }
                  } else {
                    setTag('');
                    // setSnackbarOpen(true);
                    // setToastMessage('태그는 최대 10개까지 지정 가능합니다.');
                  }
                }
              }}
              style={{
                color: theme.palette.oppositeColor.main,
                height: '32px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
              }}
            />
          </Stack>
          <Stack width="fit-content" direction="row">
            <Button sx={{ width: '130px' }}>임시저장 불러오기</Button>
            <Button sx={{ width: '130px' }}>템플릿 불러오기</Button>
          </Stack>
        </Stack>
      </Stack>
      <MDEditor height="68vh" value={md} onChange={setMd} />
      <Stack direction="row" justifyContent="flex-end">
        <Button>임시저장 저장</Button>
        <Button>템플릿 저장</Button>
        <Button>글 저장</Button>
      </Stack>
    </Stack>
  );
};

export default Write;
