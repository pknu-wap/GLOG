import React, { useEffect, useState } from 'react';
import { DeleteFriendApi, PutFriendAllowApi } from '@/api/friend-api';
import Button from '@/components/Button/Button';
import PageLink from '@/components/PageLink/PageLink';
import { MenuItem, Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@mui/material';
import { Dialog } from '@/components/Dialog/Dialog';

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
  const queryClient = useQueryClient();
  const [deleteConfirmOpen, setDeleteConFirmOpen] = useState<boolean>(false);
  const [isAccept, setIsAccept] = useState<number>(2);
  const putAllowFriendIdCreateQuery = useMutation(PutFriendAllowApi, {
    onSuccess: () => {},
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

  const deleteClick = () => {
    deleteFriendQuery.mutate({ userId: userId });
  };

  useEffect(() => {}, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const friendopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack display="flex" justifyContent="space-between">
      <Stack margin="6px 0" flexDirection="row">
        <ProfileImage imageSrc={profileImg} />

        <UserName>
          <Stack margin="0 10px 0 5px">{nickname}</Stack>
          {/*FIXME: new friend로 추가? */}
          {relationship === 'friend' ? (
            haveNewPost ? (
              <Button>
                <PageLink href={recentPostId} color="#00BFFF">
                  <NewPost></NewPost>
                </PageLink>
              </Button>
            ) : (
              <Stack></Stack>
            )
          ) : relationship === 'friending' ? (
            <Stack>요청 중</Stack>
          ) : relationship === 'friended' ? (
            <>
              <Stack>친구 요청</Stack>
              <Tooltip title="수락" arrow>
                <Button
                  onClick={() => {
                    setIsAccept(1);
                    AllowFriendOnClick();
                  }}
                  color="success">
                  <CheckIcon />
                </Button>
              </Tooltip>

              <Tooltip title="거절" arrow>
                <Button
                  onClick={() => {
                    setIsAccept(0);
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
        <Button onClick={handleClick} sx={{ padding: '0 10px 0 0', minWidth: '24px' }}>
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
    </Stack>
  );
}

export default FriendListComponent;
