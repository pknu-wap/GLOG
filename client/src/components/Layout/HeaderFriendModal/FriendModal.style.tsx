import React, { useEffect, useState } from 'react';
import { DeleteFriendApi, PutFriendAllowApi, useGetFriendReadQuery } from '@/api/friend-api';
import Button from '@/components/Button/Button';
import PageLink from '@/components/PageLink/PageLink';
import { MenuItem, Stack, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@mui/material';
import { Dialog } from '@/components/Dialog/Dialog';
import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import { useGetIntroduceQuery } from '@/api/introduce-api';
import { IIntroduce } from '@/types/dto';

export const FriendModalArea = styled(Stack)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
  flexDirection: 'column',
  //FIXME:반응형(Mobile L - 425px 부터 미흡)
  width: '50vw',
  height: '100%',
  maxWidth: '550px',
  padding: '10px 20px',
});

export const TopStack = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: '10px',
}));

const ProfileImage = styled(Stack)(({ imageSrc }: { imageSrc: string }) => ({
  backgroundColor: 'wheat',
  backgroundImage: `url(${imageSrc})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  minWidth: '30px',
}));

export const UserName = styled(Stack)({
  flexDirection: 'row',
  whiteSpace: 'nowrap',
  overflow: 'auto',
});

export const NewPost = styled(Stack)({
  color: '#00BFFF',
  transition: 'all 0.5s ease-in-out',
  '::before': {
    content: 'New Post',
  },
  ':hover::before': {
    content: '보러가기',
  },
});

function FriendListComponent({
  userId,
  nickname,
  profileImg,
  haveNewPost,
  recentPostId,
  relationship,
}: {
  userId: number;
  nickname: string;
  profileImg: string;
  haveNewPost: boolean;
  recentPostId: string;
  relationship: string;
}) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [IntroduceOpen, setIntroduceOpen] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConFirmOpen] = useState<boolean>(false);
  const [isAccept, setIsAccept] = useState<number>(Number);
  const [acceptConfirmOpen, setAcceptConfirmOpen] = useState<boolean>(false);
  const [refuseConfirmOpen] = useState<boolean>(false);
  const putAllowFriendIdCreateQuery = useMutation(PutFriendAllowApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['friend']);
    },
  });
  const AllowFriendOnClick = () => {
    const newAllowBody = {
      isAccept: isAccept,
      userId: userId,
    };

    putAllowFriendIdCreateQuery.mutate(newAllowBody);
  };

  const deleteFriendQuery = useMutation(DeleteFriendApi, {
    onSuccess() {
      queryClient.invalidateQueries(['friend']);
    },
  });

  const { data: friendReadData } = useGetFriendReadQuery({
    userId: userId,
  });
  const [, setReadData] = useState();

  const deleteClick = () => {
    deleteFriendQuery.mutate({ userId: userId });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const friendopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: introduceData } = useGetIntroduceQuery({
    userId: userId,
  });
  const [introduce, setIntroduce] = useState<IIntroduce>();

  useEffect(() => {
    setReadData(friendReadData);
    setIntroduce(introduceData);
  }, [friendReadData, introduceData]);

  return (
    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
      <Stack margin="6px 0" flexDirection="row" justifyContent="left" alignItems="center">
        <Button
          sx={{ minWidth: '30px', width: '30px', height: '30px', borderRadius: '50%' }}
          onClick={() => setIntroduceOpen(true)}>
          <ProfileImage imageSrc={profileImg} />
        </Button>

        <UserName alignItems="center">
          <Stack fontSize="18px" margin="0 10px 0 10px">
            {nickname}
          </Stack>

          {relationship === 'friend' ? (
            haveNewPost ? (
              <Button>
                <PageLink href={recentPostId}> </PageLink>
                <NewPost></NewPost>
              </Button>
            ) : (
              <Stack></Stack>
            )
          ) : relationship === 'friending' ? (
            <Stack marginLeft="10px" fontSize="15px" color="#FFA07A">
              요청 중
            </Stack>
          ) : relationship === 'friended' ? (
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
            <Stack></Stack>
          )}
        </UserName>
      </Stack>
      <Stack>
        <Button
          onClick={handleClick}
          sx={{ justifyContent: 'center', padding: '0', minWidth: '30px' }}>
          <MoreVertIcon fontSize="medium" />
        </Button>
        <Menu anchorEl={anchorEl} open={friendopen} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              setDeleteConFirmOpen(true);
            }}>
            친구 삭제
          </MenuItem>
        </Menu>
      </Stack>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConFirmOpen(false)}
        message="친구 삭제하시겠습니까?"
        action={{
          content: '확인',
          action: deleteClick,
        }}
      />
      <Dialog
        open={acceptConfirmOpen}
        onClose={() => setAcceptConfirmOpen(false)}
        message="친구 추가하시겠습니까?"
        action={{
          content: '확인',
          action: AllowFriendOnClick,
        }}
      />
      <Dialog
        open={refuseConfirmOpen}
        onClose={() => setAcceptConfirmOpen(false)}
        message="친구 거절하시겠습니까?"
        action={{
          content: '확인',
          action: AllowFriendOnClick,
        }}
      />

      <Modal open={IntroduceOpen} maxWidth="md" onClose={() => setIntroduceOpen(false)}>
        <ModalContent>
          <Stack spacing={10} padding={'40px 80px'}>
            <Stack direction="row" width="500px" spacing={10} justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={4}>
                <img
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                  }}
                  src={introduce?.imageUrl}
                  alt="profileImage"
                />
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
                <Stack color="#00BFFF">팔로잉</Stack>
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
}

export default FriendListComponent;
