import React, { useState } from 'react';
import { ModalActions, ModalContent, ModalTitle } from '@/components/Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import Button from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { ModalType } from '@/types/common';
import ModalButton from '@/components/Modal/ModalButton';

function TempSaveModal({ open, onClose }: ModalType) {
  const [clickList, setClickList] = useState<number>(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);

  const lists = {
    postTitleResponse: [
      {
        postTitleDto: {
          id: 0,
          title: 'string',
        },
      },
      {
        postTitleDto: {
          id: 1,
          title: 'string',
        },
      },
    ],
  };

  const actionClick = () => {
    onClose();
    console.log(`${clickList}번 클릭`);
  };

  const deleteClick = () => {
    console.log(`${clickList}번 삭제`);
  };

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>임시저장 글 목록</ModalTitle>
      <ModalContent>
        <Stack spacing={2}>
          {lists.postTitleResponse.map((list) => {
            return (
              <List
                key={list.postTitleDto.id}
                radioProps={{
                  checked: clickList === list.postTitleDto.id,
                  onChange: () => setClickList(list.postTitleDto.id),
                }}
                content={`#${list.postTitleDto.id} ${list.postTitleDto.title}`}
                buttonAction={
                  <Button onClick={() => setDeleteConfirmOpen(true)} size="small" color="error">
                    삭제
                  </Button>
                }
              />
            );
          })}
        </Stack>
      </ModalContent>
      <ModalActions>
        <ModalButton onClose={onClose} action={{ content: '불러오기', action: actionClick }} />
      </ModalActions>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        message="진짜 삭제하시겠습니까?"
        action={{
          content: '확인',
          action: deleteClick,
        }}
      />
    </Modal>
  );
}

export default TempSaveModal;
