import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { GuestbookType } from '@/types/common';
import { ModalContent, ModalTitle } from '../Modal/Modal.style';
import { Stack, TextField } from '@mui/material';
import Comment from './Comment';
import { PostGuestbookApi, useGetGuestbookQuery } from '@/api/guestbook-api';
import { IGuestbook, IUserDetail } from '@/types/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../Button/Button';
import { useGetUserDetailQuery } from '@/api/userDetail-api';

function GuestBookModal({ open, blogId, onClose }: GuestbookType) {
  const queryClient = useQueryClient();
  //방명록 get
  const { data: guestbookData } = useGetGuestbookQuery({
    blogId: blogId,
  });
  const [guestbook, setGuestBook] = useState<IGuestbook>();

  //방명록 post
  const [message, setMessage] = useState('');
  const postGuestbookQuery = useMutation(PostGuestbookApi, {
    onSuccess() {
      queryClient.invalidateQueries(['guestbook']);
    },
  });
  const postGuestbookClick = () => {
    const newPostGuestbookBody = {
      guestbookId: guestbook?.guestbookId,
      messageId: 0,
      message: message,
    };
    postGuestbookQuery.mutate(newPostGuestbookBody);
  };
  //test
  const {data: userDetailData} = useGetUserDetailQuery()
  const [userDetail, setUserDetail] = useState<IUserDetail>()
  

  useEffect(() => {
    setGuestBook(guestbookData);
    setUserDetail(userDetailData);
  }, [guestbookData, userDetailData]);

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>방명록 📮</ModalTitle>
      <ModalContent>
        <Stack width="600px" maxHeight="300px" overflow="scroll" spacing={6}>
          {guestbook?.messageDto.map((message) => {
            return (
              <Comment
                key={message.messageId}
                nickname={message.userDto.nickname}
                profileImage={message.userDto.profileImage}
                who={message.who}
                messageId={message.messageId}
                guestbookId={guestbook.guestbookId}
                areuOwner={guestbook.imOwner}
                message={message.message}
                createdAt={message.createdAt}
              />
            );
          })}
        </Stack>
        <Stack flexDirection="row" marginTop="20px">
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="방명록을 남겨보세요"
            sx={{ marginRight: '20px' }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              postGuestbookClick();
            }}>
            게시하기
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
}

export default GuestBookModal;
