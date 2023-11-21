import React, { useEffect, useState } from 'react';
import { ModalActions, ModalContent, ModalTitle } from '@/components/Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import Button from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { ModalType } from '@/types/common';
import ModalButton from '@/components/Modal/ModalButton';
import { DeleteTemporaryApi, useGetTemporaryQuery } from '@/api/write-api';
import { useTemporaryIdSSR } from '../../../../hooks/useRecoilSSR';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function TempSaveModal({ open, onClose }: ModalType) {
  const [clickList, setClickList] = useState<number>(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const { data } = useGetTemporaryQuery();
  const [lists, setLists] = useState<{ postTitleResponse?: { id?: number; title?: string }[] }>();
  const [, setTemporary] = useTemporaryIdSSR();
  const queryClient = useQueryClient();

  const deleteTemporaryQuery = useMutation(DeleteTemporaryApi, {
    onSuccess() {
      queryClient.invalidateQueries(['template']);
      // onClose();
    },
  });

  useEffect(() => {
    setLists(data);
  }, [data]);

  const actionClick = () => {
    setTemporary(clickList);
    onClose();
    console.log(`${clickList}번 클릭`);
  };

  const deleteClick = () => {
    console.log(`${clickList}번 삭제`);
    deleteTemporaryQuery.mutate({ temporaryId: clickList });
  };

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>임시저장 글 목록</ModalTitle>
      <ModalContent>
        <Stack spacing={2}>
          {lists?.postTitleResponse?.map((list) => {
            return (
              <List
                key={list.id}
                radioProps={{
                  checked: clickList === list.id,
                  onChange: () => setClickList(list.id ?? 0),
                }}
                content={`#${list.id} ${list.title}`}
                buttonAction={
                  <Button
                    onClick={() => {
                      setClickList(list.id ?? 0);
                      setDeleteConfirmOpen(true);
                    }}
                    size="small"
                    color="error">
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
        message="삭제하시겠습니까?"
        action={{
          content: '확인',
          action: deleteClick,
        }}
      />
    </Modal>
  );
}

export default TempSaveModal;
