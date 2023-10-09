import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ViewPostArea = styled(Stack)({
  justifyContent: 'center',
  gap: '40',
});

export const ThumbnailArea = styled(Stack)({
  backgroundColor: 'rgba(0, 0, 0, 0.54)',
  width: '100vw',
  height: '50vh',
  padding: '20px 25%',
  transform: 'translateY(-124px) translateX(-20px)',
  zIndex: '20001',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
});

export const PostRoute = styled(Stack)({
  color: 'white',
  fontSize: '18px',
});

export const PostTitle = styled(Stack)({
  color: 'white',
  fontSize: '50px',
  marginTop: '10px',
});
