import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

function PageLink({
  children,
  color,
  style,
  ...rest
}: LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; color?: string }) {
  return (
    <Link
      style={{ width: 'fit-content', textDecoration: 'none', color: color ?? '#000000', ...style }}
      {...rest}>
      {children}
    </Link>
  );
}

export default PageLink;
