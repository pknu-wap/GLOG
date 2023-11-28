export type WriteProps = {
  title: string;
  content?: string;
  tags: string[];
};

export type WriteType = 'create' | 'update' | 'readme' | 'pr';
export type WriteModalType = 'create' | 'update' | 'template' | 'temporary';
