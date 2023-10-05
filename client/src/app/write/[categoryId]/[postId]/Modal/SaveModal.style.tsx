import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const Preview = styled(Stack)(() => ({}));
export const SectionTitle = styled(Stack)(({ theme }) => ({
  lineHeight: '37px',
  color: theme.palette.oppositeColor.main,
}));

export const PreviewTitle = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}));

export const ButtonContainer = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
}));

export const NoImageContent = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '300px',
  height: '180px',
}));

export const TagContent = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '200px',
  height: '100px',
  gap: '4px',
  overflow: 'scroll',
  flexWrap: 'wrap',
}));
