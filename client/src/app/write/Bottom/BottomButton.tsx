import React, { useState } from 'react';
import { BottomButtonStyle } from '../Write.style';
import Button from '@/components/Button/Button';
import SaveModal from '../Modal/SaveModal';
import { WriteModalType, WriteProps } from '@/util/useWriteProps';
import { usePathname } from 'next/navigation';

function BottomButton({
  writeProps,
  categoryId,
  postId,
}: { writeProps: WriteProps } & { categoryId?: number; postId?: number }) {
  const [writeSaveOpen, setWriteSaveOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<WriteModalType>('create');
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isNewWrite = pathname.startsWith('/write/create');
  const isPrUpdate = pathname.startsWith('/write/pr/update');
  const isPr = pathname.startsWith('/write/pr');

  const tempSaveOnClick = () => {
    setModalType('temporary');
    setWriteSaveOpen(true);
  };

  const templateSaveOnClick = () => {
    setModalType('template');
    setWriteSaveOpen(true);
  };

  const createSaveOnClick = () => {
    setModalType('create');
    setWriteSaveOpen(true);
  };

  const updateSaveOnClick = () => {
    setModalType('update');
    setWriteSaveOpen(true);
  };

  const createPrOnClick = () => {
    setModalType('create');
    setWriteSaveOpen(true);
  };

  const updatePrOnClick = () => {
    setModalType('update');
    setWriteSaveOpen(true);
  };

  return (
    <BottomButtonStyle>
      <Button variant="outlined" onClick={tempSaveOnClick}>
        임시 저장
      </Button>
      <Button variant="outlined" onClick={templateSaveOnClick}>
        템플릿 저장
      </Button>
      <Button
        variant="contained"
        onClick={
          isNewWrite
            ? createSaveOnClick
            : isPrUpdate
            ? updatePrOnClick
            : isPr
            ? createPrOnClick
            : updateSaveOnClick
        }>
        글 저장
      </Button>

      {/* 글 저장 모달 */}
      <SaveModal
        categoryId={categoryId}
        postId={postId}
        modalType={modalType}
        writeProps={writeProps}
        open={writeSaveOpen}
        onClose={() => setWriteSaveOpen(false)}
      />
    </BottomButtonStyle>
  );
}

export default BottomButton;
