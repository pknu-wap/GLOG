'use client';

import { Stack, TextField } from '@mui/material';
import {
  useTemplateIdSSR,
  useTemporaryIdSSR,
  useUserThemeSSR,
} from '../../../../../hooks/useRecoilSSR';
import { useEffect, useState } from 'react';
import { ToolBar } from '../../Write.style';
import TagList from '../../TagList';
import TopButton from '../../Top/TopButton';
import MDEditor from '@uiw/react-md-editor';
import BottomButton from '../../Bottom/BottomButton';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { WriteProps } from '@/util/useWriteProps';
import { useGetTemplateDetailQuery, useGetTemporaryDetailQuery } from '@/api/write-api';
import onImagePasted from '@/util/onImagePasted';

const Write = ({ params }: { params: { categoryId: number } }) => {
  const [userTheme] = useUserThemeSSR();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string | undefined>('');
  const [tags, setTags] = useState<string[]>([]);
  const [templateId] = useTemplateIdSSR();
  const [temporaryId] = useTemporaryIdSSR();
  // const [temporaryId, setTemporary] = useTemporaryIdSSR();

  const { data: templateData, refetch: templateRefetch } = useGetTemplateDetailQuery({
    templateId,
  });
  const { data: temporaryData, refetch: temporaryRefetch } = useGetTemporaryDetailQuery({
    temporaryId,
  });

  useEffect(() => {
    templateRefetch();
  }, [templateId]);

  useEffect(() => {
    temporaryRefetch();
  }, [temporaryId]);

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

  useEffect(() => {
    setTitle('');
    setContent('');
    setTags([]);
  }, []);

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
      <MDEditor
        onPaste={async (event) => {
          await onImagePasted(event.clipboardData, setContent);
        }}
        onDrop={async (event) => {
          await onImagePasted(event.dataTransfer, setContent);
        }}
        height="68vh"
        value={content}
        onChange={setContent}
      />
      <BottomButton categoryId={params.categoryId} writeProps={writeProps} />
    </Stack>
  );
};

export default Write;
