import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { ModalActions, ModalContent, ModalTitle } from '../Modal/Modal.style';
import { Stack, TextField } from '@mui/material';
import ModalButton from '../Modal/ModalButton';
import { CategorySettingModalType } from '@/types/common';
import Button from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteCategoryApi, PutCategoryApi } from '@/api/category-api';

function CategorySettingModal({ open, categoryId, onClose }: CategorySettingModalType) {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteCategoryQuery = useMutation(DeleteCategoryApi, {
    onSuccess() {
      queryClient.invalidateQueries(['category']);
    },
  });
  const deleteClick = () => {
    deleteCategoryQuery.mutate({ categoryId: categoryId });
    onClose();
  };

  const [newCategoryName, setNewCategoryName] = useState('');
  const putCategoryQuery = useMutation(PutCategoryApi, {
    onSuccess() {
      queryClient.invalidateQueries(['category']);
    },
  });
  const putCategoryNameClick = () => {
    const newCategoryNameBody = {
      categoryId: categoryId,
      newCategoryName: newCategoryName,
    };
    putCategoryQuery.mutate(newCategoryNameBody);
    onClose();
  };
  console.log(`카테고리 ID : ${categoryId}`);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle fontSize="24px" fontWeight="bold">
        <Stack direction="row" spacing={8} mb={6}>
          <Stack>카테고리 설정</Stack>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
            sx={{ width: 'fit-content', marginLeft: 3 }}>
            카테고리 삭제
          </Button>
        </Stack>
      </ModalTitle>
      <ModalContent sx={{ '&&.MuiDialogContent-root': { paddingTop: '0px' } }}>
        <Stack width="600px" spacing={5}>
          <Stack fontSize="16px" fontWeight="bold">
            깃허브 연동 여부 : X
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack fontSize="16px" fontWeight="bold">
              카테고리 이름 :
            </Stack>
            <TextField
              variant="standard"
              onChange={(e) => {
                setNewCategoryName(e.target.value);
              }}
            />
          </Stack>
        </Stack>
      </ModalContent>
      <ModalActions>
        <ModalButton onClose={onClose} action={{ content: '변경', action: putCategoryNameClick }} />
      </ModalActions>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        message="카테고리를 삭제하시겠습니까?"
        action={{ content: '샥제', action: deleteClick }}
      />
    </Modal>
  );
}

export default CategorySettingModal;
