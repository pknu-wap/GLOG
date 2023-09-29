import React from 'react';
import { Dialog } from './Modal.style';
import { DialogProps } from '@mui/material';

function Modal({ children, open, onClose, ...rest }: DialogProps) {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      {children}
    </Dialog>
  );
}

export default Modal;
