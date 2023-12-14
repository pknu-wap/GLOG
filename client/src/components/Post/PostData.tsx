'use client';
import {
  Avatar,
  Box,
  Chip,
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
} from '../../app/[blogName]/home/[categoryId]/[postId]/postId.style';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { useGetSidebarQuery, useGetPostQuery } from '@/api/blog-api';
import { IIntroduce, IPostContent, IReplyContent, ISidebarContent } from '@/types/dto';
import CenterContent from '@/components/Layout/CenterContent';
import { Home, KeyboardArrowRight } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Button/IconButton';
import Button from '@/components/Button/Button';
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
import FootPrintAnimation from '@/components/FootPrint/FootPrintAnimation';
import { usegetblogIdQuery } from '@/api/readme-api';
import { AddLikeApi, DeleteWriteApi } from '@/api/write-api';
import { enqueueSnackbar } from 'notistack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { postVisitApi } from '@/api/mypage-api';
import { useUserThemeSSR } from '../../../hooks/useRecoilSSR';

const PostData = ({
  params,
}: {
  params: { blogName: string; categoryId: string; postId: string };
}) => {
  const { data: blogIdData } = usegetblogIdQuery({ blogUrl: params.blogName });
  const [blogId, setBlogId] = useState<number>();
  const { data: sidebarData } = useGetSidebarQuery({ blogId: blogIdData });
  const { data: postData } = useGetPostQuery({ postId: Number(params.postId) });
  const [IntroduceOpen, setIntroduceOpen] = useState<boolean>(false);
  const [userTheme] = useUserThemeSSR();
  const router = useRouter();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('likesCount');
  const orderList = ['likesCount', 'createdAt'];
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
      setMessage('');
    },
  });

  const patchAddLikeQuery = useMutation(AddLikeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });

  const postVisitQuery = useMutation(postVisitApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['visit']);
    },
  });

  useEffect(() => {
    blogId && blogId > 0 && postVisitQuery.mutate({ blogId });
  }, [blogId]);

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
    setBlogId(blogIdData);
  }, [sidebarData, postData, introduceData, replyData, blogIdData]);

  const deleteWritePrQuery = useMutation(DeleteWriteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['postData']);
      enqueueSnackbar({ message: '게시글 삭제가 완료되었습니다.', variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar({ message: '에러가 발생하였습니다.', variant: 'error' });
    },
  });

  const deletePrPostOnClick = (postId: number) => {
    deleteWritePrQuery.mutate({ postId });
  };

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
            postData?.thumbnail ??
            'https://s3.console.aws.amazon.com/s3/object/elasticbeanstalk-us-east-1-064991853848?region=us-east-1&prefix=thumbnail/road_sunset_horizon_118582_1920x1080.jpg'
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
                  {post?.isAuthor && (
                    <>
                      <PageLink href={`/write/update/${params.categoryId}/${params.postId}`}>
                        <Button>수정</Button>
                      </PageLink>
                      <Button
                        onClick={() => deletePrPostOnClick(Number(params?.postId))}
                        color="error">
                        삭제
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </CenterContent>
        </BlackContainer>
      </ThumbnailArea>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        isMe={sidebarData?.isMyPage}
        rightContainer={
          <Stack width={'100%'} bgcolor={userTheme === 'dark' ? 'transparent' : '#FCFAF1'} p={12}>
            <MDEditor.Markdown source={post?.content} />
            {/* 댓글 */}
            <PostReply>
              <Stack mb={8} spacing={2}>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Stack fontSize="14px">조회수 : {post?.viewsCount} </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack fontSize="14px">추천수 : {post?.likesCount} </Stack>
                    <IconButton
                      size="small"
                      onClick={() => patchAddLikeQuery.mutate({ postId: Number(params?.postId) })}>
                      <ThumbUpIcon color={post?.isLiked ? 'primary' : undefined} />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                  {post?.hashtags?.map((hashtag, i) => {
                    return (
                      <Chip color="primary" sx={{ width: 'fit-content' }} key={i} label={hashtag} />
                    );
                  })}
                </Stack>
              </Stack>
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
                  value={message}
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
                    replyId={replyInfo.replyId}
                    userId={replyInfo.userDto.userId}
                    nickname={replyInfo.userDto.nickname}
                    profileImage={replyInfo.userDto.profileImage}
                    message={replyInfo.message}
                    likesCount={replyInfo.likesCount}
                    isLiked={replyInfo.isLiked}
                    who={replyInfo.who}></RepliesComponent>
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
                <Image width={30} height={30} src={introduce?.imageUrl ?? ''} alt="" />
                <Stack>
                  <Stack padding="8px" fontSize="25px">
                    {introduce?.nickname}
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button size="small" variant="outlined">
                      <PageLink href={`/${introduce?.blogUrl}`}>블로그 바로가기</PageLink>
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
      <FootPrintAnimation blogId={Number(blogIdData)} />
    </Stack>
  );
};

export default PostData;
