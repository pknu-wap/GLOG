import React, { useState } from 'react';
import { TopButtonStyle } from '../Write.style';
import Button from '@/components/Button/Button';
import TempSaveModal from '../Modal/TempSaveModal';
import TemplateModal from '../Modal/TemplateModal';

function TopButton() {
  const [tempSaveOpen, setTempSaveOpen] = useState<boolean>(false);
  const [templateOpen, setTemplateOpen] = useState<boolean>(false);

  return (
    <TopButtonStyle>
      <Button sx={{ width: '130px' }} onClick={() => setTempSaveOpen(true)}>
        임시저장 불러오기
      </Button>
      <Button sx={{ width: '130px' }} onClick={() => setTemplateOpen(true)}>
        템플릿 불러오기
      </Button>
      <TempSaveModal open={tempSaveOpen} onClose={() => setTempSaveOpen(false)} />
      <TemplateModal open={templateOpen} onClose={() => setTemplateOpen(false)} />
    </TopButtonStyle>
  );
}

export default TopButton;
