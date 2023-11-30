import { useTheme } from '@mui/material';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

function PageLink({
  children,
  color,
  style,
  ...rest
}: LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; color?: string }) {
  const theme = useTheme();
  return (
    <Link
      style={{
        width: 'fit-content',
        textDecoration: 'none',
        color: color ?? theme.palette.oppositeColor.main,
        ...style,
      }}
      {...rest}>
      {children}
    </Link>
  );
}

export default PageLink;
