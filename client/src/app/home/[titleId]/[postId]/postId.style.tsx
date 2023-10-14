import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const ThumbnailArea = styled(Stack)({
  width: '100%',
  height: '50vh',
  position: 'relative',
});

export const BlackContainer = styled(Stack)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ImageContainer = styled(Image)({
  backgroundAttachment: 'fixed',
});
