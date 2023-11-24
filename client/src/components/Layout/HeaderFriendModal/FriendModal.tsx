import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import { ModalType } from '@/types/common';
import { Menu, MenuItem, Stack, TextField } from '@mui/material';
import FriendListComponent, { FriendModalArea, TopStack } from './FriendModal.style';
import { useGetFriendQuery, useGetFriendSearchQuery } from '@/api/friend-api';
import React, { useEffect, useState } from 'react';
import { IFriendsContent } from '@/types/dto';
import Button from '@/components/Button/Button';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
function FriendModal({ open, onClose }: ModalType) {
  const [kind, setKind] = useState('recentFriend');
  const { data: friendData } = useGetFriendQuery({
    kind: kind,
  });
  const [friend, setFriend] = useState<IFriendsContent>();
  const kindList = ['recentFriend', 'name', 'recentPost'];

  const [nickname, setNickname] = useState('');
  const { data: searchFriendData } = useGetFriendSearchQuery({
    name: nickname,
  });
  const [search, setSearch] = useState<IFriendsContent>();
  const friendCount = friend?.userSimpleDtos.userSimpleDtos.length;
  

  useEffect(() => {
    setFriend(friendData);
    setSearch(searchFriendData);
  }, [friendData, searchFriendData]);
  console.log(friendData, search);


  //정렬기준
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const friendopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Modal open={open} maxWidth="lg" onClose={onClose}>
      <ModalContent>
        <FriendModalArea>
          <TopStack>
            <Stack marginBottom="5px">친구들</Stack>
            <Stack>{friendCount} 명</Stack>
          </TopStack>
          <Stack flexDirection="row" justifyContent="space-between" margin="5px 0 30px 0">
            <Stack>
              <Stack flexDirection="row" justifyContent="left">
                <Button onClick={handleClick} sx={{ padding: '0 10px 0 0', minWidth: '24px' }}>
                  <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
                </Button>
                <Menu anchorEl={anchorEl} open={friendopen} onClose={handleClose}>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[0]);
                    }}>
                    최신순
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[1]);
                    }}>
                    이름순
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[2]);
                    }}>
                    최근 포스팅순
                  </MenuItem>
                </Menu>
                <Stack>정렬기준</Stack>
              </Stack>
            </Stack>
            <TextField placeholder="검색하기" variant="standard" label='' size='small' sx={{ width: '75%' }} 
              onChange={(e) => {setNickname(e.target.value)}} />
          </Stack>

          <Stack flexDirection="column" maxHeight="200px">
            {friend?.userSimpleDtos?.userSimpleDtos.map((friendInfo) => {
              return (
                <FriendListComponent
                  key={friendInfo.friendId}
                  userId={friendInfo.userId}
                  nickname={friendInfo.nickname}
                  profileImg={friendInfo.nickname}
                  relationship={friendInfo.relationship}
                  haveNewPost={friendInfo.haveNewPost}
                  recentPostId={`/{blogUrl}/home/1/${friendInfo.recentPostId}`}
                />
              );
            })}
          </Stack>
        </FriendModalArea>
      </ModalContent>
    </Modal>
  );
}

export default FriendModal;
