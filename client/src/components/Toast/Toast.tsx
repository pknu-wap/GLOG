import { ModalType } from '@/types/common';
import { Alert, AlertProps, Snackbar } from '@mui/material';
import React from 'react';

function Toast({
  open,
  onClose,
  toastMessage,
  severity,
}: ModalType & { toastMessage: string; severity?: AlertProps['severity'] }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      sx={{ '&.MuiSnackbar-root': { top: 50, zIndex: 50000 } }}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <Alert severity={severity ?? 'error'} onClose={onClose}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
