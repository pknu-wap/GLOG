import { ModalType } from '@/types/common';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';

function Toast({ open, onClose, toastMessage }: ModalType & { toastMessage: string }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      sx={{ '&.MuiSnackbar-root': { top: 50 } }}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <Alert severity={'error'} onClose={onClose}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
