'use client';
import { Box, Icon, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BlackContainer, ImageContainer, ThumbnailArea } from './postId.style';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { useGetSidebarQuery, usePostPostQuery } from '@/api/blog-api';
import { IPostContent, ISidebarContent } from '@/types/dto';
import CenterContent from '@/components/Layout/CenterContent';
import { KeyboardArrowRight } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import { useUserThemeSSR } from '../../../../../hooks/useRecoilSSR';

const page = ({ params }: { params: { titleId: string; postId: string } }) => {
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });
  const { data: postData } = usePostPostQuery({ postId: Number(params.postId) });
  const [userTheme] = useUserThemeSSR();

  const [writeList, setWriteList] = useState<ISidebarContent[]>();
  const [post, setPost] = useState<IPostContent>();

  const sidebarContent: ISidebarContent[] = sidebarData?.sidebarDtos;

  useEffect(() => {
    setWriteList(sidebarContent);

    setPost(postData);
  }, [sidebarData, postData]);

  console.log(sidebarContent);

  return (
    <Stack>
      <ThumbnailArea>
        <ImageContainer
          imageSrc={
            'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332'
          }
        />
        <BlackContainer paddingTop="64px">
          <CenterContent bgcolor="transparent">
            <Stack gap={8} width="100%" height="100%" direction="row">
              <Stack width="140px" height="100%"></Stack>
              <Stack color="white">
                <Stack height="24px" direction={'row'} alignItems="center" gap={1}>
                  <Box>
                    {
                      sidebarContent?.filter(
                        (category) => category.categoryId === Number(params.titleId),
                      )[0].categoryName
                    }
                  </Box>
                  <Icon fontSize="small" sx={{ marginTop: '-6px' }}>
                    <KeyboardArrowRight />
                  </Icon>
                  <Box style={{ fontWeight: 'bold' }}>{post?.title}</Box>
                </Stack>
                <Stack fontSize="36px">{post?.title}</Stack>
                <Stack direction="row" alignItems={'center'} height="30px" gap={6} marginTop="24px">
                  <img
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                    }}
                    src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
                    alt="profileImage"
                  />
                  <Stack margin="auto 0px">{post?.author?.nickname}</Stack>
                </Stack>
              </Stack>
            </Stack>
          </CenterContent>
        </BlackContainer>
      </ThumbnailArea>
      <DragAndDrop
        footprintList={writeList}
        categoryNumber={params.titleId}
        rightContainer={
          <Stack width={'100%'} bgcolor={userTheme === 'dark' ? 'transparent' : '#FCFAF1'} p={12}>
            <MDEditor.Markdown source={post?.content} />
          </Stack>
        }
      />
    </Stack>
  );
};

export default page;
