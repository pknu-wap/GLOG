import React from 'react';
import { ButtonProps, Button as MuiButton, styled } from '@mui/material';

export const ButtonStyled = styled(MuiButton)(() => ({
  ':hover': {
    transition: 'background-color 0.5s ease, border 0.5s ease',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
  ':active': {
    transition: 'background-color 0.5s ease, border 0.5s ease',
    opacity: '0.8',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  },
}));

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <ButtonStyled disableRipple {...rest}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
