import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import { ModalType } from '@/types/common';
import { InputAdornment, Menu, MenuItem, Stack, TextField } from '@mui/material';
import FriendListComponent, { FriendModalArea, TopStack } from './FriendModal.style';
import { useGetFriendQuery, useGetFriendSearchQuery } from '@/api/friend-api';
import React, { useEffect, useState } from 'react';
import { IFriendsContent, IUserDetail } from '@/types/dto';
import Button from '@/components/Button/Button';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import SearchIcon from '@mui/icons-material/Search';
import { useGetUserDetailQuery } from '@/api/userDetail-api';

function FriendModal({ open, onClose }: ModalType) {
  const [kind, setKind] = useState('recentFriend');
  const { data: friendData } = useGetFriendQuery({
    kind: kind,
  });
  const [friend, setFriend] = useState<IFriendsContent>();
  const kindList = ['recentFriend', 'name', 'recentPost'];
  const friendCount = friend?.userSimpleDtos.simpleDtos.length;
  const { data: userDetailData } = useGetUserDetailQuery();
  const [userDetail, setUserDetail] = useState<IUserDetail>();

  const [nickname, setNickname] = useState('');
  const { data: searchFriendData } = useGetFriendSearchQuery({
    name: nickname,
  });
  const [search, setSearch] = useState<IFriendsContent>();
  useEffect(() => {
    setFriend(friendData);
    setSearch(searchFriendData);
    setUserDetail(userDetailData);
  }, [friendData, searchFriendData, userDetailData]);

  //정렬기준
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const friendopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <Modal open={open} maxWidth="lg" onClose={onClose}>
      <ModalContent>
        <FriendModalArea>
          <TopStack>
            <Stack marginBottom="5px" fontSize="20px">
              친구들
            </Stack>
            <Stack>{friendCount} 명</Stack>
          </TopStack>
          <Stack flexDirection="row" justifyContent="space-between" margin="5px 0 30px 0">
            <Stack justifyContent="center">
              <Stack flexDirection="row" justifyContent="left">
                <Button onClick={handleClick} sx={{ padding: '0', minWidth: '24px' }}>
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
                <Stack marginLeft="10px">정렬기준</Stack>
              </Stack>
            </Stack>
            <Button sx={{ borderRadius: '20px' }} onClick={() => setSearchOpen(true)}>
              친구 검색하기
            </Button>
          </Stack>
          <Stack flexDirection="column" maxHeight="200px">
            {friend?.userSimpleDtos?.simpleDtos.map((friendInfo) => {
              return (
                <FriendListComponent
                  key={friendInfo.friendId}
                  userId={friendInfo.userId}
                  nickname={friendInfo.nickname}
                  profileImg={friendInfo.nickname}
                  relationship={friendInfo.relationship}
                  haveNewPost={friendInfo.haveNewPost}
                  recentPostId={`/${userDetail?.blogUrl}`}
                />
              );
            })}
          </Stack>
        </FriendModalArea>
      </ModalContent>

      {/* 친구 검색 모달 */}
      <Modal open={searchOpen} maxWidth="lg" onClose={() => setSearchOpen(false)}>
        <Stack width="50vw" height="100%" maxWidth="550px" padding="10px 20px" marginTop="5px">
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="검색하기"
            variant="standard"
            label=""
            size="small"
            sx={{ marginBottom: '20px' }}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <Stack>
            {search?.userSimpleDtos.simpleDtos.map((searchInfo) => {
              return (
                <FriendListComponent
                  key={searchInfo.friendId}
                  userId={searchInfo.userId}
                  nickname={searchInfo.nickname}
                  profileImg={searchInfo.nickname}
                  relationship={searchInfo.relationship}
                  haveNewPost={searchInfo.haveNewPost}
                  recentPostId={`/${userDetail?.blogUrl}`}
                />
              );
            })}
          </Stack>
        </Stack>
      </Modal>
    </Modal>
  );
}

export default FriendModal;
