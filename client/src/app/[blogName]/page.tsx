'use client';

import { useGetSidebarQuery } from '@/api/blog-api';
import { useGetReadMeQuery } from '@/api/readme-api';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { ISidebarContent } from '@/types/dto';
import { Stack } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

const Home = ({ params }: { params: { blogName: string } }) => {
  const [writeList, setWriteList] = useState<ISidebarContent[]>();
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });

  //[FIXME: 나중에 blogName blogUrl로 바꾸기]
  const { data: readMeData } = useGetReadMeQuery({ blogId: 3 });
  const [readMe, setReadMe] = useState('');

  useEffect(() => {
    setWriteList(sidebarData?.sidebarDtos);
    setReadMe(readMeData);
  }, [sidebarData, readMeData]);

  return (
    <Stack height={'fit-content'}>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        rightContainer={
          <Stack width="80%" margin="auto" overflow={'scroll'}>
            <MDEditor.Markdown source={readMe} />
          </Stack>
        }
      />
    </Stack>
  );
};

export default Home;
