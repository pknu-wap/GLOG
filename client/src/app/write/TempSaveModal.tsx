import React, { useState } from 'react';
import { ModalActions, ModalContent, ModalTitle } from '@/components/Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import Button from '@/components/Button/Button';

function TempSaveModal({ open, onClose }: { open: boolean; onClose: (newValue: boolean) => void }) {
  const [clickList, setClickList] = useState<number>(0);

  const lists = [
    {
      id: 0,
      content: '임시저장 글 목록',
    },
    {
      id: 1,
      content: '임시저장 글 목록',
    },
    {
      id: 2,
      content: '임시저장 글 목록',
    },
  ];

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>임시저장 글 목록</ModalTitle>
      <ModalContent>
        <Stack spacing={2}>
          {lists.map((list) => {
            return (
              <List
                key={list.id}
                radioProps={{
                  checked: clickList === list.id,
                  onChange: () => setClickList(list.id),
                }}
                content={`#${list.id} ${list.content}`}
                buttonAction={
                  <Button size="small" color="error">
                    삭제
                  </Button>
                }
              />
            );
          })}
        </Stack>
      </ModalContent>
      <ModalActions>
        <Button size="small">취소</Button>
        <Button size="small" variant="outlined">
          불러오기
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default TempSaveModal;
