'use client';

import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useUserThemeSSR } from '../../../../../hooks/useRecoilSSR';
import Button from '@/components/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PutReadMeApi, useGetReadMeQuery, usegetblogIdQuery } from '@/api/readme-api';
import { useRouter } from 'next/navigation';

const ReadMe = ({ params }: { params: { blogName: string } }) => {
  const [userTheme] = useUserThemeSSR();
  const [content, setContent] = useState<string | undefined>('');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: blogIdData } = usegetblogIdQuery({ blogUrl: params.blogName });
  const { data: readMeData } = useGetReadMeQuery({ blogId: blogIdData });

  const putReadmeQuery = useMutation(PutReadMeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['readMe']);
      router.push(`/${params.blogName}`);
    },
  });

  useEffect(() => {
    setContent(readMeData.content);
  }, [readMeData]);

  const readmeSaveOnClick = () => {
    const newReadMeBody = {
      readme: content,
    };

    putReadmeQuery.mutate(newReadMeBody);
  };

  return (
    <Stack mt={10} spacing={4} data-color-mode={userTheme}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack fontSize="18px" fontWeight="bold">
          README
        </Stack>
        <Button onClick={readmeSaveOnClick} sx={{ width: 'fit-content' }} variant="contained">
          저장
        </Button>
      </Stack>
      <MDEditor height="80vh" value={content} onChange={setContent} />
    </Stack>
  );
};

export default ReadMe;
