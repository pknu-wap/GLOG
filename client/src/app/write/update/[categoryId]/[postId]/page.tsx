'use client';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { ToolBar } from '../../../Write.style';
import TagList from '../../../TagList';
import BottomButton from '../../../Bottom/BottomButton';
import { WritePropsContext, WriteType } from '@/util/useWriteProps';
import TopButton from '../../../Top/TopButton';
import {
  useTemplateIdSSR,
  useTemporaryIdSSR,
  // useTemporaryIdSSR,
  useUserThemeSSR,
} from '../../../../../../hooks/useRecoilSSR';
import { useGetTemplateDetailQuery, useGetTemporaryDetailQuery } from '@/api/write-api';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Write = ({ params }: { params: WriteType['params'] }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string | undefined>('# Hello World');
  const [tags, setTags] = useState<string[]>([]);
  const [userTheme] = useUserThemeSSR();
  const [templateId] = useTemplateIdSSR();
  const [temporaryId] = useTemporaryIdSSR();

  const { data: templateData } = useGetTemplateDetailQuery({ templateId });
  const { data: temporaryData } = useGetTemporaryDetailQuery({ temporaryId });

  const state = useMemo(() => ({ content, title, tags, params }), [content, title, tags, params]);

  console.log(templateData);

  useEffect(() => {
    setTitle(templateData?.title);
    setContent(templateData?.content);
    setTags(templateData?.hashtags);
  }, [templateData]);

  useEffect(() => {
    setTitle(temporaryData?.title);
    setContent(temporaryData?.content);
    setTags(temporaryData?.hashtags);
  }, [temporaryData]);

  return (
    <WritePropsContext.Provider value={state}>
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
        <BottomButton />
      </Stack>
    </WritePropsContext.Provider>
  );
};

export default Write;
