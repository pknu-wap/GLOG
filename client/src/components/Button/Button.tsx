'use client';

import React from 'react';
import { ButtonProps, Button as MuiButton, styled } from '@mui/material';

export const ButtonStyled = styled(MuiButton)(({ theme, color = 'primary', variant }) => ({
  boxShadow: 'none',
  color:
    variant === 'contained'
      ? theme.palette.mode === 'light'
        ? '#ffffff'
        : '#000000'
      : theme.palette[color]?.main,
  ':hover': {
    backgroundColor: theme.palette.primary.light,
    transition: 'background-color 0.5s ease, border 0.5s ease',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
  ':active': {
    backgroundColor: variant === 'contained' ? theme.palette.primary.main : 'transparent',
    transition: 'background-color 0.5s ease, border 0.5s ease',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
}));

const Button = ({ children, variant, color, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled variant={variant} disableRipple color={color} {...rest}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
