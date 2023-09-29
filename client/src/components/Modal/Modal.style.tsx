import { Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalTitle = styled(DialogTitle)({
  '&&.MuiDialogTitle-root': { backgroundColor: 'black', padding: '16px 8px' },
});

export const ModalContent = styled(DialogContent)({
  '&&.MuiDialogContent-root': { backgroundColor: 'black', padding: '20px 8px' },
});

export const ModalActions = styled(DialogActions)({
  '&&.MuiDialogActions-root': { backgroundColor: 'black' },
});

export const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: '12px 28px',
    backgroundImage: 'none',
    backgroundColor: theme.palette.themeColor.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));
