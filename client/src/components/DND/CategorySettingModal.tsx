import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { ModalActions, ModalContent, ModalTitle } from '../Modal/Modal.style';
import { Stack, TextField } from '@mui/material';
import ModalButton from '../Modal/ModalButton';
import { ModalType } from '@/types/common';
import Button from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';

function CategorySettingModal({ open, onClose }: ModalType) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle fontSize="24px" fontWeight="bold">
        카테고리 설정
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => setDeleteDialogOpen(true)}
          sx={{ width: 'fit-content', marginLeft: 3 }}>
          카테고리 삭제
        </Button>
      </ModalTitle>
      <ModalContent sx={{ '&&.MuiDialogContent-root': { paddingTop: '0px' } }}>
        <Stack width="600px" spacing={5}>
          <Stack fontSize="18px" fontWeight="bold">
            깃허브 연동 여부 : X
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack fontSize="18px" fontWeight="bold">
              카테고리 이름 :
            </Stack>
            <TextField variant="standard" />
          </Stack>
        </Stack>
      </ModalContent>
      <ModalActions>
        <ModalButton
          onClose={onClose}
          action={{ content: '변경', action: () => console.log('asdf') }}
        />
      </ModalActions>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        message="카테고리를 삭제하시겠습니까?"
        action={{ content: '샥제', action: onClose }}
      />
    </Modal>
  );
}

export default CategorySettingModal;
