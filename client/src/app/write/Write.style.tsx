import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BottomButtonStyle = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '4px',
}));

export const TopButtonStyle = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '8px',
}));

export const TagContainer = styled(Stack)(() => ({
  width: '100%',
  overflow: 'scroll',
  gap: '4px',
  color: 'white',
  flexDirection: 'row',
}));

export const ToolBar = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '16px',
}));

export const TagTextfield = styled('input')(({ theme }) => ({
  color: theme.palette.oppositeColor.main,
  height: '32px',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
}));
