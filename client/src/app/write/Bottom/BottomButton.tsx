import React, { useState } from 'react';
import { BottomButtonStyle } from '../Write.style';
import Button from '@/components/Button/Button';
import SaveDialog from './SaveDialog';
import SaveModal from '../Modal/SaveModal';

function BottomButton() {
  const [saveOpen, setSaveOpen] = useState<boolean>(false);
  const [writeSaveOpen, setWriteSaveOpen] = useState<boolean>(false);
  const [saveType, setSaveType] = useState<'임시' | '템플릿'>('임시');

  const tempSaveOnClick = () => {
    setSaveType('임시');
    setSaveOpen(true);
  };

  const templateSaveOnClick = () => {
    setSaveType('템플릿');
    setSaveOpen(true);
  };

  return (
    <BottomButtonStyle>
      <Button onClick={tempSaveOnClick}>임시 저장</Button>
      <Button onClick={templateSaveOnClick}>템플릿 저장</Button>
      <Button onClick={() => setWriteSaveOpen(true)}>글 저장</Button>

      {/* 임시저장, 템플릿 저장 모달 */}
      <SaveDialog open={saveOpen} onClose={() => setSaveOpen(false)} saveType={saveType} />

      {/* 글 저장 모달 */}
      <SaveModal open={writeSaveOpen} onClose={() => setWriteSaveOpen(false)} />
    </BottomButtonStyle>
  );
}

export default BottomButton;
