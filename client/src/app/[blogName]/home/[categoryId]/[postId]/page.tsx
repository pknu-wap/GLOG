'use client';
import { Avatar, Box, Icon, Menu, MenuItem, Stack, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RepliesComponent, {
  BlackContainer,
  GetReplies,
  ImageContainer,
  PostReply,
  ReplyHandle,
  ReplyPagenation,
  ThumbnailArea,
  WriteReply,
} from './postId.style';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { useGetSidebarQuery, useGetPostQuery } from '@/api/blog-api';
import { IPostContent, IReplyContent, ISidebarContent } from '@/types/dto';
import CenterContent from '@/components/Layout/CenterContent';
import { Home, KeyboardArrowRight } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import { useUserThemeSSR } from '../../../../../../hooks/useRecoilSSR';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';
import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import Button from '@/components/Button/Button';
import PageLink from '@/components/PageLink/PageLink';
import { PostReplyApi, useGetReplyQuery } from '@/api/reply-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';

const page = ({ params }: { params: { blogName: string; categoryId: string; postId: string } }) => {
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });
  const { data: postData } = useGetPostQuery({ postId: Number(params.postId) });
  const [open, setOpen] = useState(false);
  const [userTheme] = useUserThemeSSR();
  const theme = useTheme();
  const router = useRouter();

  //[FIXME: repliese get할 때 body말고 parameter로 바뀌어졌을 때 useState() 바꿔주기]
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('like');
  const orderList = ['like', 'recent', 'oldest'];
  const { data: replyData } = useGetReplyQuery({
    postId: Number(params.postId),
    page: page,
    order: order,
  });
  const [reply, setReply] = useState<IReplyContent>();

  //sidebar, main-post
  const [writeList, setWriteList] = useState<ISidebarContent[]>();
  const [post, setPost] = useState<IPostContent>();
  const sidebarContent: ISidebarContent[] = sidebarData?.sidebarDtos;

  //댓글 post 기능 연동
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const postReplyCreateQuery = useMutation(PostReplyApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['replies']);
    },
  });
  const ReplyOnClick = () => {
    const newReplyBody = {
      postId: Number(params.postId),
      message: message,
    };

    postReplyCreateQuery.mutate(newReplyBody);
  };

  useEffect(() => {
    setWriteList(sidebarContent);
    setPost(postData);

    setReply(replyData);
  }, [sidebarData, postData, replyData]);

  //댓글 정렬기준
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  <PageLink href={`/write/update/${params.categoryId}/${params.postId}`}>
                    <Button>수정</Button>
                  </PageLink>
                  <Button color="error">삭제</Button>
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

            {/* 댓글 */}
            <PostReply>
              <ReplyHandle>
                <Stack flexDirection={'row'}>
                  <Stack>
                    <Button onClick={handleClick} sx={{ padding: '0 10px 0 0', minWidth: '24px' }}>
                      <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOrder(orderList[0]);
                        }}>
                        인기순
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOrder(orderList[1]);
                        }}>
                        최신순
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setOrder(orderList[2]);
                        }}>
                        오래된순
                      </MenuItem>
                    </Menu>
                  </Stack>
                  <Stack>정렬기준</Stack>
                </Stack>
              </ReplyHandle>
              <WriteReply>
                <Avatar sx={{ width: 35, height: 35 }} alt="" src="/static/images/avatar/1.jpg" />
                <TextField
                  fullWidth
                  variant="standard"
                  label={'댓글 추가'}
                  sx={{ margin: '0 30px' }}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <Button variant="outlined" sx={{ width: '25px' }} onClick={() => ReplyOnClick()}>
                  등록
                </Button>
              </WriteReply>
            </PostReply>
            <GetReplies>
              {/* map 이용해서 뿌려야함 */}
              {reply?.replyDtos?.map((replyInfo) => {
                return (
                  <RepliesComponent
                    key={replyInfo.replyId}
                    nickname={replyInfo.userDto.nickname}
                    profileImage={replyInfo.userDto.profileImage}
                    message={replyInfo.message}
                    likesCount={replyInfo.likesCount}
                    isLiked={replyInfo.isLiked}
                    isEdit={replyInfo.isEdit}></RepliesComponent>
                );
              })}
              <ReplyPagenation
                count={replyData?.totalPages}
                page={page + 1}
                sx={{ margin: '30px 0' }}
                onChange={(_, newPage) => {
                  setPage(newPage - 1);
                }}></ReplyPagenation>
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
