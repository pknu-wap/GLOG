import { ReactNode } from 'react';

export type PostComponentType = {
  thumbnail: string;
  title: string;
  likesCount: number;
  viewsCount: number;
  Icon: ReactNode;
  isPrivate?: boolean;
};
