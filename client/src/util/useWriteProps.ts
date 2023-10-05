import { createContext, useContext } from 'react';

export type WriteType = {
  title: string;
  content?: string;
  tags: string[];
  params: { categoryId: string; postId: string };
};

export const WritePropsContext = createContext<WriteType | undefined>(undefined);

export const useWriteProps = () => {
  const state = useContext(WritePropsContext);

  return state;
};
