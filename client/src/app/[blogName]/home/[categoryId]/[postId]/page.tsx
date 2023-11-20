'use client';
import { Avatar, Box, Icon, Stack, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BlackContainer, GetReplies, ImageContainer, PostReply, ReplyCount, ReplyHandle, RiteReply, ThumbnailArea } from './postId.style';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { useGetSidebarQuery, useGetPostQuery } from '@/api/blog-api';
import { IPostContent, ISidebarContent } from '@/types/dto';
import CenterContent from '@/components/Layout/CenterContent';
import { Home, KeyboardArrowRight } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import { useUserThemeSSR } from '../../../../../../hooks/useRecoilSSR';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';
import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import Button from '@/components/Button/Button';
import { useGetReplyQuery } from '@/api/reply-api';
import ReplyBasicMenu from './ReplyMenu';

const page = ({ params }: { params: { blogName: string; categoryId: string; postId: string } }) => {
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });
  const { data: postData } = useGetPostQuery({ postId: Number(params.postId) });
  const [open, setOpen] = useState(false);
  const [userTheme] = useUserThemeSSR();
  const theme = useTheme();
  const router = useRouter();

  //[FIXME: repliese get할 때 body말고 parameter로 바뀌어졌을 때 useState() 바꿔주기]
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('id');
  const { data: replyData } = useGetReplyQuery({
    postId: Number(params.postId),
    page: page,
    order: order,
  });
  const [reply, setReply] = useState();

  const [writeList, setWriteList] = useState<ISidebarContent[]>();
  const [post, setPost] = useState<IPostContent>();
  console.log(reply);

  const sidebarContent: ISidebarContent[] = sidebarData?.sidebarDtos;

  useEffect(() => {
    setWriteList(sidebarContent);
    setReply(replyData);

    setPost(postData);
  }, [sidebarData, postData, replyData]);

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
              <Stack color="#ffffff">
                <Stack height="24px" direction={'row'} alignItems="center" gap={1}>
                  <Box>
                    {
                      sidebarContent?.filter(
                        (category) => category.categoryId === Number(params.categoryId),
                      )[0]?.categoryName
                    }
                  </Box>
                  <Icon fontSize="small" sx={{ marginTop: '-6px' }}>
                    <KeyboardArrowRight />
                  </Icon>
                  <Box style={{ fontWeight: 'bold' }}>{post?.title}</Box>
                </Stack>
                <Stack fontSize="36px">{post?.title}</Stack>
                <Stack direction="row" alignItems={'center'} height="30px" gap={3} marginTop="24px">
                  {/* <img
                    onClick={() => setOpen(true)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                    src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
                    alt="profileImage"
                  /> */}
                  <Stack margin="auto 0px">{post?.author?.nickname}</Stack>
                  <IconButton color="white">
                    <Home fontSize="small" onClick={() => router.push(`/${params.blogName}`)} />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </CenterContent>
        </BlackContainer>
      </ThumbnailArea>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        rightContainer={
          <Stack width={'100%'} bgcolor={userTheme === 'dark' ? 'transparent' : '#FCFAF1'} p={12}>
            <MDEditor.Markdown source={post?.content} />
            <PostReply>
              <ReplyHandle>
                <ReplyCount>댓글 5개</ReplyCount>
                <Stack flexDirection={"row"}>
                  <ReplyBasicMenu></ReplyBasicMenu>
                  <Stack>정렬기준</Stack>
                </Stack>
              </ReplyHandle>
              <RiteReply>
                <Avatar sx={{ width: 24, height: 24 }} alt="" src="/static/images/avatar/1.jpg" />
                <TextField fullWidth />
              </RiteReply>
            </PostReply>
            <GetReplies>
              {/* map 이용해서 뿌려야함 */}
            </GetReplies>
          </Stack>
        }
      />
      <Modal open={open} maxWidth="md" onClose={() => setOpen(false)}>
        <ModalContent>
          <Stack spacing={10} padding={'40px 80px'}>
            <Stack direction="row" width="500px" spacing={10} justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={4}>
                {/* <img
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                  }}
                  src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
                  alt="profileImage"
                /> */}
                <Stack>
                  <Stack padding="8px">Du yeong</Stack>
                  <Stack direction="row" spacing={2}>
                    <Button size="small" variant="outlined">
                      블로그 바로가기
                    </Button>
                    <Button size="small" variant="contained">
                      친구 요청
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>친구 200명</Stack>
            </Stack>
            <Stack width="500px" spacing={2}>
              <Stack color="primary.main" fontSize="18px">
                한 줄 소개
              </Stack>
              <Stack
                fontSize="14px"
                width="500px"
                borderLeft={`1px solid ${theme.palette.primary.main}`}
                padding={'0px 0px 0px 12px'}
                sx={{ overflowY: 'scroll', wordBreak: 'break-all' }}
                height="fit-content"
                maxHeight="200px">
                안녕
              </Stack>
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default page;
