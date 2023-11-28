'use client';

import { useGetSidebarQuery } from '@/api/blog-api';
import { PutReadMeApi, useGetReadMeQuery, usegetblogIdQuery } from '@/api/readme-api';
import Button from '@/components/Button/Button';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { ISidebarContent } from '@/types/dto';
import { Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
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
    },
  });

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
              id="standard-basic"
              label="Standard"
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
    </Stack>
  );
};

export default Home;
