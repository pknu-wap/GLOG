import { ModalType } from '@/types/common';
import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import PageLink from '../PageLink/PageLink';
import FriendModal from '../Layout/HeaderFriendModal/FriendModal';

function SettingMenu({ open, onClose, anchorEl }: ModalType & { anchorEl: null | HTMLElement }) {
  const [friendOpen, setFriendOpen] = useState<boolean>(false);

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem>
        <PageLink
          href="/mypage"
          onClick={() => {
            onClose();
          }}>
          마이페이지
        </PageLink>
      </MenuItem>
      <MenuItem onClick={() => setFriendOpen(true)}>친구</MenuItem>
      <MenuItem>
        <PageLink
          href="/mypage"
          onClick={() => {
            onClose();
          }}>
          스크랩
        </PageLink>
      </MenuItem>
      <MenuItem onClick={() => localStorage.setItem('token', '')}>Logout</MenuItem>
      <MenuItem>
        <PageLink
          href="/login"
          onClick={() => {
            onClose();
          }}>
          로그인
        </PageLink>
      </MenuItem>
      <FriendModal open={friendOpen} onClose={() => setFriendOpen(false)}></FriendModal>
    </Menu>
  );
}

export default SettingMenu;
