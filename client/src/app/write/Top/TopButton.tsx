import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import TempSaveModal from '../Modal/TempSaveModal';
import TemplateModal from '../Modal/TemplateModal';
import { TopButtonStyle } from '../Write.style';

function TopButton() {
  const [tempSaveOpen, setTempSaveOpen] = useState<boolean>(false);
  const [templateOpen, setTemplateOpen] = useState<boolean>(false);

  return (
    <TopButtonStyle>
      <Button variant="outlined" sx={{ width: '85px' }} onClick={() => setTempSaveOpen(true)}>
        임시저장
      </Button>
      <Button variant="outlined" sx={{ width: '80px' }} onClick={() => setTemplateOpen(true)}>
        템플릿
      </Button>
      {/* 임시저장 불러오기 모달 */}
      <TempSaveModal open={tempSaveOpen} onClose={() => setTempSaveOpen(false)} />

      {/* 템플릿 저장 불러오기 모달 */}
      <TemplateModal open={templateOpen} onClose={() => setTemplateOpen(false)} />
    </TopButtonStyle>
  );
}

export default TopButton;
