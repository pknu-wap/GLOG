'use client';

import React from 'react';
import Button from '../Button/Button';

function ModalButton({
  onClose,
  action,
}: {
  onClose: () => void;
  action: { content: string; action: () => void };
}) {
  return (
    <>
      <Button size="small" onClick={onClose}>
        취소
      </Button>
      <Button size="small" variant="outlined" onClick={action.action}>
        {action.content}
      </Button>
    </>
  );
}

export default ModalButton;
