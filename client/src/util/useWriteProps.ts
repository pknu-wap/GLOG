import { createContext, useContext } from 'react';

type WriteType = {
  title: string;
  content?: string;
  tags: string[];
};

export const WritePropsContext = createContext<WriteType | undefined>(undefined);

export const useWriteProps = () => {
  const state = useContext(WritePropsContext);

  return state;
};
