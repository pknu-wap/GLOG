import React, { useEffect, useState } from 'react';
import { DeleteFriendApi, PutFriendAllowApi, useGetFriendReadQuery } from '@/api/friend-api';
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
  const [isAccept, setIsAccept] = useState<number>(Number);
  const putAllowFriendIdCreateQuery = useMutation(PutFriendAllowApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['friend'])
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

  const {data: friendReadData} = useGetFriendReadQuery({
    userId: userId
  })
  const [, setReadData] = useState()

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

  useEffect(() => {
    setReadData(friendReadData);
  }, [friendReadData]);

  return (
    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
      <Stack margin="6px 0" flexDirection="row" justifyContent="left" alignItems="center">
        <ProfileImage imageSrc={profileImg} />

        <UserName alignItems="center">
          <Stack fontSize='18px' margin="0 10px 0 10px">{nickname}</Stack>
          {/*FIXME: new friend로 추가? */}
          {relationship === 'friend' ? (
            haveNewPost ? (
              <Button>
                <PageLink href={recentPostId}>
                  <NewPost></NewPost>
                </PageLink>
              </Button>
            ) : (
              <Stack></Stack>
            )
          ) : relationship === 'friending' ? (
            <Stack marginLeft="10px" fontSize="15px" color="#FFA07A">요청 중</Stack>
          ) : relationship === 'friended' ? (
            <>
              <Stack margin='0 5px 0 10px'>친구 요청</Stack>
              <Tooltip title="수락" arrow>
                <Button
                  sx={{minWidth: '36px', height: '36px', padding: '0'}}
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
                  sx={{minWidth: '36px', height: '36px', padding: '0'}}
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
        <Button onClick={handleClick} sx={{justifyContent: 'center', padding: '0', minWidth: '30px' }}>
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
