import React from 'react';
import Modal from '../Modal/Modal';
import { ModalType } from '@/types/common';
import { ModalContent, ModalTitle } from '../Modal/Modal.style';
import { Stack } from '@mui/material';
import Comment from './Comment';

function GuestBookModal({ open, onClose }: ModalType) {
  const data = {
    simpleMessageDtos: [
      {
        simpleMessageDto: {
          messageId: '',
          userId: '',
          profileImage: 'string',
          nickname: 'string',
          message: 'string',
          createdAt: 'datetime',
          who: 'other', // 해당 댓글이 방장인지 나인지 other인지
        },
      },
      {
        simpleMessageDto: {
          messageId: '',
          userId: '',
          profileImage: 'string',
          nickname: 'string',
          message: 'string',
          createdAt: 'datetime',
          who: 'me', // 해당 댓글이 방장인지 나인지 other인지
        },
      },
      {
        simpleMessageDto: {
          messageId: '',
          userId: '',
          profileImage: 'string',
          nickname: 'string',
          message: 'string',
          createdAt: 'datetime',
          who: 'other', // 해당 댓글이 방장인지 나인지 other인지
        },
      },
    ],
    imOwner: false, // 내가 방장인지 아닌지
    guestbookId: '0L',
  };

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>방명록 📮</ModalTitle>
      <ModalContent>
        <Stack width="600px" maxHeight="600px" spacing={6}>
          {data.simpleMessageDtos.map((message) => {
            return (
              <Comment
                isMe={message.simpleMessageDto.who === 'me'}
                key={message.simpleMessageDto.messageId}
              />
            );
          })}
        </Stack>
      </ModalContent>
    </Modal>
  );
}

export default GuestBookModal;
