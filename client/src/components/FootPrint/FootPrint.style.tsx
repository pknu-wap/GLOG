import { Stack, Theme, styled } from '@mui/material';
import Image from 'next/image';

export const FootPrintStyle = styled(Image)({
  transition: 'all .35s ease-in-out',
  cursor: 'pointer',
});

export const GuestBookButtonStyle = styled(Stack, {
  shouldForwardProp: (propName: string) => propName !== 'newFootprints',
})(({ newFootprints }: { newFootprints: number[] }) => ({
  opacity: newFootprints.length === 0 ? 1 : 0,
  transition: 'all .35s ease-in-out',
  bottom: 50,
  right: 100,
  p: 4,
  borderRadius: 20,
  position: 'fixed',
}));

export const GuestBookTooltipStyle = styled(Stack, {
  shouldForwardProp: (propName: string) => propName !== 'tooltipOpacity',
})(({ tooltipOpacity, theme }: { tooltipOpacity: 0 | 1; theme?: Theme }) => ({
  opacity: tooltipOpacity,
  transition: 'all .35s ease-in-out',
  backgroundColor: theme?.palette.primary.light,
  position: 'fixed',
  bottom: 135,
  right: 80,
  borderRadius: 2,
  padding: '4px 12px',
}));
