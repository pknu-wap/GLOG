import { ListProps, Radio, RadioProps, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

function List({
  content,
  buttonAction,
  radioProps,
}: {
  content: string;
  buttonAction?: ReactNode;
  radioProps?: RadioProps;
} & ListProps) {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '600px',
        borderBottom: '1px solid #d9d9d9',
        justifyContent: 'space-between',
      }}>
      <Stack direction="row" alignItems="center">
        {radioProps && <Radio {...radioProps} />}
        <Typography>{content}</Typography>
      </Stack>
      {buttonAction}
    </Stack>
  );
}

export default List;
