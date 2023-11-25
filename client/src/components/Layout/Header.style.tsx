import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TopStack = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: '10px',
}));