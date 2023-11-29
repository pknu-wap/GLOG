'use client';

import { useGetSidebarQuery } from '@/api/blog-api';
import { PutReadMeApi, useGetReadMeQuery, usegetblogIdQuery } from '@/api/readme-api';
import Button from '@/components/Button/Button';
import DragAndDrop from '@/components/DND/DragAndDrop';
import FootPrintAnimation from '@/components/FootPrint/FootPrintAnimation';
import { ISidebarContent } from '@/types/dto';
import { Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const Home = ({ params }: { params: { blogName: string } }) => {
  const [writeList, setWriteList] = useState<ISidebarContent[]>();

  //[FIXME: 나중에 blogName blogUrl로 바꾸기]
  const [, setBlogId] = useState();
  const { data: blogIdData } = usegetblogIdQuery({ blogUrl: params.blogName });

  const { data: sidebarData } = useGetSidebarQuery({ blogId: blogIdData });
  const { data: readMeData } = useGetReadMeQuery({ blogId: blogIdData });
  const [readMe, setReadMe] = useState('');
  const queryClient = useQueryClient();

  const [content, setContent] = useState<string>('');
  const putReadMeCreateQuery = useMutation(PutReadMeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['readMe']);
      enqueueSnackbar({ message: '리드미 페이지가 수정되었습니다.', variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar({ message: '리드미 페이지가 수정되지 않았습니다.', variant: 'error' });
    },
    }
  );

  const ReadMeOnClick = () => {
    const newReadMeBody = {
      content: content,
    };

    putReadMeCreateQuery.mutate(newReadMeBody);
  };

  useEffect(() => {
    setWriteList(sidebarData?.sidebarDtos);
    setReadMe(readMeData?.body?.content);
    setBlogId(blogIdData);
  }, [sidebarData, readMeData, blogIdData]);

  return (
    <Stack height={'fit-content'}>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        rightContainer={
          <Stack width="80%" margin="auto" overflow={'scroll'}>
            <TextField
              label="수정할 리드미를 입력해주세요"
              variant="standard"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <Button variant="outlined" sx={{ width: '100px' }} onClick={() => ReadMeOnClick()}>
              수정하기
            </Button>
            <MDEditor.Markdown source={readMe} />
          </Stack>
        }
      />
      <FootPrintAnimation blogId={blogIdData} />
    </Stack>
  );
};

export default Home;
