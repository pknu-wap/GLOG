'use client';

import DragAndDrop from '@/components/DND/DragAndDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Stack } from '@mui/material';

const Home = () => {
  const sidebarList = {
    sidebarDto: {
      categoryId: 0,
      categoryName: '프론트엔드',
      postTitleDtos: [
        {
          postId: 0,
          postTitle: 'HTML',
        },
        {
          postId: 1,
          postTitle: 'CSS',
        },
        {
          postId: 2,
          postTitle: 'JS',
        },
      ],
    },
  };

  const writeList = sidebarList.sidebarDto.postTitleDtos;

  return (
    <>
      <Sidebar />
      <DragAndDrop
        footprintList={writeList}
        rightContainer={
          <Stack width={'100%'} height={'100%'} bgcolor="white">
            <Stack bgcolor="#ffffff" borderRadius="50%" width="50px" height="50px"></Stack>
          </Stack>
        }
      />
    </>
  );
};

export default Home;
