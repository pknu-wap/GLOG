import React, { useRef, useState } from 'react';
import { BottomButtonStyle } from '../../../Write.style';
import Button from '@/components/Button/Button';
import SaveDialog from './SaveDialog';
import SaveModal from '../Modal/SaveModal';
import { NoImageContent, Preview, PreviewTitle, SectionTitle } from '../Modal/SaveModal.style';
import IconButton from '@/components/Button/IconButton';
import { Add } from '@mui/icons-material';
import { Stack } from '@mui/material';

function BottomButton() {
  const [saveOpen, setSaveOpen] = useState<boolean>(false);
  const [writeSaveOpen, setWriteSaveOpen] = useState<boolean>(false);
  const [saveType, setSaveType] = useState<'임시' | '템플릿'>('임시');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [image, setImage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>(null);

  const tempSaveOnClick = () => {
    setSaveType('임시');
    setSaveOpen(true);
  };

  const templateSaveOnClick = () => {
    setSaveType('템플릿');
    setSaveOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = async (e: any) => {
    const file = e.target.files[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    await new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
    setImage(file);
  };

  const handleButtonClick = () => {
    fileInput.current?.click();
  };

  return (
    <BottomButtonStyle>
      <Preview>
        <PreviewTitle>
          <SectionTitle>미리보기</SectionTitle>
          <Button color="error" onClick={() => setImageSrc(null)}>
            삭제
          </Button>
        </PreviewTitle>
        {!imageSrc ? (
          <NoImageContent>
            <IconButton onClick={handleButtonClick} sx={{ width: '50px', height: '50px' }}>
              <Add sx={{ width: '50px', height: '50px' }} />
              <input style={{ display: 'none' }} type="file" ref={fileInput} onChange={onUpload} />
            </IconButton>
          </NoImageContent>
        ) : (
          <></>
          // <img src={imageSrc} alt="" style={{ width: '300px', height: '180px' }} />
        )}
        <Stack>{'asdf'}</Stack>
      </Preview>
      <Button variant="outlined" onClick={tempSaveOnClick}>
        임시 저장
      </Button>
      <Button variant="outlined" onClick={templateSaveOnClick}>
        템플릿 저장
      </Button>
      <Button variant="contained" onClick={() => setWriteSaveOpen(true)}>
        글 저장
      </Button>

      {/* 임시저장, 템플릿 저장 모달 */}
      <SaveDialog
        image={image}
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        saveType={saveType}
      />

      {/* 글 저장 모달 */}
      <SaveModal open={writeSaveOpen} onClose={() => setWriteSaveOpen(false)} />
    </BottomButtonStyle>
  );
}

export default BottomButton;
