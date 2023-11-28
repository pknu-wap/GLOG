import { Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import CommentTime from './CommentTime';
import StarRateIcon from '@mui/icons-material/StarRate';
import Button from '../Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteGuestbookApi, PutGuestbookApi } from '@/api/guestbook-api';
import { Dialog } from '@/components/Dialog/Dialog';
import Modal from '../Modal/Modal';
import { ModalTitle, ModalContent } from '../Modal/Modal.style';

function Comment({
  nickname,
  profileImage,
  who,
  messageId,
  guestbookId,
  areuOwner,
  message,
  createdAt,
}: {
  nickname: string;
  profileImage: string;
  who: string;
  messageId: number;
  guestbookId: number;
  areuOwner: boolean;
  message: string;
  createdAt: string;
}) {
  const queryClient = useQueryClient();
  //방명록 delete
  const [deleteConfirmOpen, setDeleteConFirmOpen] = useState<boolean>(false);
  const deleteGuestbookQuery = useMutation(DeleteGuestbookApi, {
    onSuccess() {
      queryClient.invalidateQueries(['guestbook']);
    },
  });
  const deleteClick = () => {
    deleteGuestbookQuery.mutate({ messageId: messageId });
  };
  //방명록 put
  const [putMessageOpen, setPutMessageOpen] = useState<boolean>(false);
  const [putMessage, setPutMessage] = useState('');
  const putGuestbookQuery = useMutation(PutGuestbookApi, {
    onSuccess() {
      queryClient.invalidateQueries(['guestbook']);
    },
  });
  const PutGuestbookClick = () => {
    const newPutGuestbookBody = {
      guestbookId: guestbookId,
      messageId: messageId,
      message: putMessage,
    };
    putGuestbookQuery.mutate(newPutGuestbookBody);
  };

  return (
    <Stack spacing={3} width="100%" alignItems={who === 'me' || who === 'owner(me)' ? 'flex-end' : 'flex-start'}>
      <Stack flexDirection={who === 'me' || who === 'owner(me)' ? "row-reverse" : "row"} alignItems="center">
        {/*<Image width={30} height={30} src={profileImage} alt="" />*/}
        <img
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          src={profileImage}
          alt="profileImage"
              />
        <Stack fontSize="16px" fontWeight="bold" margin='0 5px'>
          {nickname}
        </Stack>

        {areuOwner ? (
          who === 'owner(me)' ? (
            <Stack alignItems='center' flexDirection="row-reverse" margin='0 5px'>
              <StarRateIcon></StarRateIcon>
              <Stack flexDirection="row">
                <Button onClick={() => setPutMessageOpen(true)}>수정</Button>
                <Button
                  color='error'
                  onClick={() => {
                    setDeleteConFirmOpen(true);
                  }}>
                  삭제
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack flexDirection="row">
              <Button
                color='error'
                onClick={() => {
                  setDeleteConFirmOpen(true);
                }}>
                삭제
              </Button>
            </Stack>
          )
        ) : (
          who === 'owner' ? (
            <Stack alignItems='center' flexDirection="row" margin='0 10px'>
              <StarRateIcon></StarRateIcon>
            </Stack>
          ) : who === 'me' ? (
            <Stack flexDirection="row">
              <Stack flexDirection="row">
                <Button onClick={() => setPutMessageOpen(true)}>수정</Button>
                <Button
                  color='error'
                  onClick={() => {
                    setDeleteConFirmOpen(true);
                  }}>
                  삭제
                </Button>
              </Stack>
            </Stack>
          ) : (
            <></>
          )
        )}
      </Stack>
      <CommentTime who={who} message={message} createdAt={createdAt} />
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConFirmOpen(false)}
        message="메시지를 삭제하시겠습니까?"
        action={{
          content: '확인',
          action: deleteClick,
        }}
      />
      <Modal open={putMessageOpen} onClose={() => setPutMessageOpen(false)}>
        <ModalTitle>수정하기</ModalTitle>
        <ModalContent>
          <TextField
            fullWidth
            defaultValue={message}
            onChange={(e) => {
              setPutMessage(e.target.value);
            }}></TextField>
          <Button
            onClick={() => {
              PutGuestbookClick();
            }}>
            게시하기
          </Button>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default Comment;
