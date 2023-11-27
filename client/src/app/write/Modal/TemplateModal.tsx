import React, { useEffect, useState } from 'react';
import { ModalActions, ModalContent, ModalTitle } from '@/components/Modal/Modal.style';
import Modal from '@/components/Modal/Modal';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import Button from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { ModalType } from '@/types/common';
import ModalButton from '@/components/Modal/ModalButton';
import { DeleteTemplateApi, useGetTemplateQuery } from '@/api/write-api';
import { ITemplate } from '@/types/dto';
import { useTemplateIdSSR } from '../../../../hooks/useRecoilSSR';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function TemplateModal({ open, onClose }: ModalType) {
  const [clickList, setClickList] = useState<number>(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [lists, setLists] = useState<ITemplate>({ postTitleResponse: [{ title: '', id: 0 }] });
  const { data: templateListData } = useGetTemplateQuery();
  const [, setTemplate] = useTemplateIdSSR();
  const queryClient = useQueryClient();

  const deleteTemplateQuery = useMutation(DeleteTemplateApi, {
    onSuccess() {
      queryClient.invalidateQueries(['template']);
      onClose();
    },
  });

  useEffect(() => {
    setLists(templateListData);
  }, [templateListData]);

  const actionClick = () => {
    setTemplate(clickList);
    onClose();
  };

  const deleteClick = () => {
    deleteTemplateQuery.mutate({ templateId: clickList });
  };

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalTitle>템플릿 글 목록</ModalTitle>
      <ModalContent>
        <Stack spacing={2}>
          {lists?.postTitleResponse?.map((list) => {
            return (
              <List
                key={list.id}
                radioProps={{
                  checked: clickList === list.id,
                  onChange: () => setClickList(list.id),
                }}
                content={`${list.title}`}
                buttonAction={
                  <Button
                    onClick={() => {
                      setClickList(list.id);
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

export default TemplateModal;
