import Link, { LinkProps } from 'next/link';
import React from 'react';

function PageLink({ ...rest }: LinkProps) {
  return <Link {...rest}>PageLink</Link>;
}

export default PageLink;
