'use client';

import React, { useState } from 'react';
import Button from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';

function ModalButton({
  onClose,
  action,
}: {
  onClose: () => void;
  action: { content: string; action: () => void };
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={onClose}>
        취소
      </Button>
      <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
        {action.content}
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        message={`작성중인 내용이 사라집니다. 진행하시겠습니까?`}
        action={{
          content: '확인',
          action: action.action,
        }}
      />
    </>
  );
}

export default ModalButton;
