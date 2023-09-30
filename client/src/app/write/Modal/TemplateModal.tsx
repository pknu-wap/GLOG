import React, { useState } from 'react';
import { ModalActions, ModalContent, ModalTitle } from '@/components/Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import Button from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { ModalType } from '@/types/common';

function TemplateModal({ open, onClose }: ModalType) {
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

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>템플릿 글 목록</ModalTitle>
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
        <Button size="small" onClick={onClose}>
          취소
        </Button>
        <Button size="small" variant="outlined">
          불러오기
        </Button>
      </ModalActions>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        message="진짜 삭제하시겠습니까?"
        action={{
          content: '확인',
          action: () => console.log('asdf'),
        }}
      />
    </Modal>
  );
}

export default TemplateModal;
