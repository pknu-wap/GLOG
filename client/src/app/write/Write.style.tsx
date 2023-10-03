import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BottomButtonStyle = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
}));

export const TopButtonStyle = styled(Stack)(() => ({
  flexDirection: 'row',
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
