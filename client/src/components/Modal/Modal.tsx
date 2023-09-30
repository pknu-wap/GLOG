import React from 'react';
import { DialogStyle } from './Modal.style';
import { DialogProps } from '@mui/material';

function Modal({ children, open, onClose, ...rest }: DialogProps) {
  return (
    <DialogStyle open={open} onClose={onClose} {...rest}>
      {children}
    </DialogStyle>
  );
}

export default Modal;
