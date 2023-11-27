'use client';
import {
  Avatar,
  Box,
  Icon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
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
import { IIntroduce, IPostContent, IReplyContent, ISidebarContent } from '@/types/dto';
import CenterContent from '@/components/Layout/CenterContent';
import { Home, KeyboardArrowRight } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import { useUserThemeSSR } from '../../../../../../hooks/useRecoilSSR';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';
import Button from '@/components/Button/Button';
import PageLink from '@/components/PageLink/PageLink';
import { PostReplyApi, useGetReplyQuery } from '@/api/reply-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import { useGetIntroduceQuery } from '@/api/introduce-api';
import PageLink from '@/components/PageLink/PageLink';
import { PutFriendAllowApi, PutFriendRequestApi } from '@/api/friend-api';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const page = ({ params }: { params: { blogName: string; categoryId: string; postId: string } }) => {
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });
  const { data: postData } = useGetPostQuery({ postId: Number(params.postId) });
  const [IntroduceOpen, setIntroduceOpen] = useState<boolean>(false);
  const [userTheme] = useUserThemeSSR();
  const router = useRouter();
  const theme = useTheme();

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

  //친구 요청/수락/거절

  const [isAccept, setIsAccept] = useState<number>(Number);
  const putAllowFriendIdCreateQuery = useMutation(PutFriendAllowApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['friend']);
    },
  });
  const AllowFriendOnClick = () => {
    const newAllowBody = {
      isAccept: isAccept,
      userId: post?.author?.userId ?? 0,
    };

    putAllowFriendIdCreateQuery.mutate(newAllowBody);
  };
  const PutFriendRequestQuery = useMutation(PutFriendRequestApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['friend']);
    },
  });
  const FriendRequestOnClick = () => {
    const newRequestBody = {
      userId: post?.author?.userId ?? 0,
    };
    PutFriendRequestQuery.mutate(newRequestBody);
  };

  const { data: introduceData } = useGetIntroduceQuery({
    userId: post?.author?.userId ?? 0,
  });

  const [introduce, setIntroduce] = useState<IIntroduce>();

  useEffect(() => {
    setWriteList(sidebarContent);
    setPost(postData);
    setIntroduce(introduceData);
    setReply(replyData);
  }, [sidebarData, postData, introduceData, replyData]);

  //댓글 정렬기준
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(introduce?.imageUrl);
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
                  <Button
                    sx={{ minWidth: '30px', width: '30px', height: '30px', borderRadius: '50%' }}
                    onClick={() => setIntroduceOpen(true)}>
                    <img
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                      }}
                      src={post?.author?.profileImage}
                      alt="profileImage"
                    />
                  </Button>

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
                    userId={replyInfo.userDto.userId}
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
      {/* 게시물 글쓴이 introduction */}
      <Modal open={IntroduceOpen} maxWidth="md" onClose={() => setIntroduceOpen(false)}>
        <ModalContent>
          <Stack spacing={10} padding={'40px 80px'}>
            <Stack direction="row" width="500px" spacing={10} justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={4}>
                
                <Image width={30} height={30} src={introduce?.imageUrl ?? ''} alt=''/>
                <Stack>
                  <Stack padding="8px" fontSize="25px">
                    {introduce?.nickname}
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button size="small" variant="outlined">
                      <PageLink href={`/${introduce?.blogUrl}`}> </PageLink>
                      블로그 바로가기
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Stack fontSize="18px" marginBottom="15px">
                  친구 {introduce?.friendCount} 명
                </Stack>
                {introduce?.relationship === 'friend' ? (
                  <Stack color="#00BFFF">팔로잉</Stack>
                ) : introduce?.relationship === 'friending' ? (
                  <Stack marginLeft="10px" fontSize="15px" color="#FFA07A">
                    요청 중
                  </Stack>
                ) : introduce?.relationship === 'friended' ? (
                  <>
                    <Stack margin="0 5px 0 10px">친구 요청</Stack>
                    <Tooltip title="수락" arrow>
                      <Button
                        sx={{ minWidth: '36px', height: '36px', padding: '0' }}
                        onClick={() => {
                          setIsAccept(0);
                          AllowFriendOnClick();
                        }}
                        color="success">
                        <CheckIcon />
                      </Button>
                    </Tooltip>

                    <Tooltip title="거절" arrow>
                      <Button
                        sx={{ minWidth: '36px', height: '36px', padding: '0' }}
                        onClick={() => {
                          setIsAccept(1);
                          AllowFriendOnClick();
                        }}
                        color="error">
                        <CloseIcon />
                      </Button>
                    </Tooltip>
                  </>
                ) : (
                  <Stack>
                    <Button onClick={() => FriendRequestOnClick()}>친구 요청</Button>
                  </Stack>
                )}
              </Stack>
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
                {introduce?.introduction}
              </Stack>
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default page;
