import React, { useState } from 'react';
import { ModalActions, ModalContent, ModalTitle } from '@/components/Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import Button from '@/components/Button/Button';

function TempSaveModal({ open, onClose }: { open: boolean; onClose: (newValue: boolean) => void }) {
  const [clickList, setClickList] = useState<number>(0);

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
