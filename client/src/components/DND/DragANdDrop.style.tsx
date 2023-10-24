import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const BearFootprint = styled(Stack)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '5px',
  width: 'fit-content',
});

export const Big__toe = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '10px',
  height: '10px',
  position: 'relative',
  top: '5px',
  left: '0px',
}));

export const Small__toe3 = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '5px',
  height: '5px',
  position: 'absolute',
  top: '0px',
  left: '-5px',
}));

export const Small__toe2 = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '5px',
  height: '5px',
  position: 'absolute',
  top: '-5px',
  left: '2px',
}));

export const Small__toe = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: '5px',
  height: '5px',
  position: 'absolute',
  top: '0px',
  left: '10px',
}));
