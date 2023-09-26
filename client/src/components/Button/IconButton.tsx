import React from 'react';
import {
  IconButtonProps as IconButtonProps,
  IconButton as MuiIconButton,
  styled,
} from '@mui/material';

export const IconButtonStyled = styled(MuiIconButton)(() => ({
  ':hover': {
    transition: 'background-color 0.5s ease, border 0.5s ease',
    opacity: '0.6',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
  ':active': {
    transition: 'background-color 0.5s ease, border 0.5s ease',
    opacity: '0.3',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
}));

const IconButton = ({ children, ...rest }: IconButtonProps) => {
  return (
    <IconButtonStyled disableRipple {...rest}>
      {children}
    </IconButtonStyled>
  );
};

export default IconButton;
