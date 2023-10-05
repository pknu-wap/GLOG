import React from 'react';
import Button from '../Button/Button';
import { ModalActions, ModalContent } from '../Modal/Modal.style';
import Modal from '../Modal/Modal';
import { ModalType } from '@/types/common';

export const Dialog = ({
  open,
  onClose,
  action,
  message,
}: ModalType & { action: { content: string; action: () => void }; message: string }) => {
  const handleAction = () => {
    action.action();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent sx={{ width: '440px' }}>{message}</ModalContent>
      <ModalActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleAction}>{action.content}</Button>
      </ModalActions>
    </Modal>
  );
};
