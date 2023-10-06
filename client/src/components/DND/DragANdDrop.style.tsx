import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const BearFootprint = styled(Stack)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '5px',
});

export const Big__toe = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  position: 'absolute',
}));

export const Small__toe = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  position: 'absolute',
  top: '-40px',
  left: '14px',
}));
export const Small__toe2 = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  position: 'absolute',
  top: '-50px',
  left: '-10px',
}));
export const Small__toe3 = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  position: 'absolute',
  top: '-40px',
  left: '-34px',
}));
