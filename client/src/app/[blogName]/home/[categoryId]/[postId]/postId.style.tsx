import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ThumbnailArea = styled(Stack)({
  width: '100%',
  height: '35vh',
  position: 'relative',
});

export const BlackContainer = styled(Stack)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ImageContainer = styled(Stack)(({ imageSrc }: { imageSrc: string }) => ({
  backgroundAttachment: 'fixed',
  backgroundImage: `url(${imageSrc})`,
  backgroundSize: '100% 38vh',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
}));

export const RepliesArea = styled(Stack)({});
