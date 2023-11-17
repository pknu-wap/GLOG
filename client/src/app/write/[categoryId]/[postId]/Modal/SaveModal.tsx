import React, { useRef, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { Dialog } from '@/components/Dialog/Dialog';
import { ModalType, PrivateMapType } from '@/types/common';
import ModalButton from '@/components/Modal/ModalButton';
import { ModalActions, ModalContent } from '@/components/Modal/Modal.style';
import { Chip, Stack } from '@mui/material';
import IconButton from '@/components/Button/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@/components/Button/Button';
import {
  Preview,
  NoImageContent,
  PreviewTitle,
  SectionTitle,
  TagContent,
  ButtonContainer,
} from './SaveModal.style';
import { useWriteProps } from '@/util/useWriteProps';
import { useMutation } from '@tanstack/react-query';
import { PostWriteApi, UpdateWriteApi } from '@/api/write-api';
import { useRouter } from 'next/navigation';

function SaveModal({ open, onClose }: ModalType) {
  const [postConfirmOpen, setPostConfirmOpen] = useState<boolean>(false);
  const router = useRouter();
  const write = useWriteProps();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>(null);
  const [image, setImage] = useState('');
  const [privateMode, setPrivateMode] = useState<'private' | 'public'>('private');
  const isNewWrite = write?.params?.postId === '0';

  const postWriteCreateQuery = useMutation(PostWriteApi, {
    onSuccess: () => router.push('/home'),
  });

  const updateWriteCreateQuery = useMutation(UpdateWriteApi, {
    onSuccess: () => router.push('/home'),
  });

  const actionClick = () => {
    setPostConfirmOpen(true);
  };

  const postOnClick = () => {
    const formData = new FormData();
    onClose();

    const newWriteBody = {
      title: write?.title,
      content: write?.content,
      isPr: true,
      isPrivate: privateMode === 'private' ? true : false,
      categoryId: Number(write?.params?.categoryId),
      hashtags: write?.tags,
    };

    const modifyWriteBody = {
      title: write?.title,
      content: write?.content,
      isPrivate: privateMode === 'private' ? true : false,
      postId: Number(write?.params?.postId),
      hashtags: write?.tags,
    };

    formData.append('thumbnail', image ?? null);

    const json = JSON.stringify(isNewWrite ? newWriteBody : modifyWriteBody);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    formData.append('postCreateRequest', blob);

    isNewWrite ? postWriteCreateQuery.mutate(formData) : updateWriteCreateQuery.mutate(formData);
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

  const privateMap: PrivateMapType = {
    publicButton: {
      private: {
        color: 'oppositeColor',
        variant: 'text',
      },
      public: {
        color: 'primary',
        variant: 'contained',
      },
    },
    privateButton: {
      private: {
        color: 'primary',
        variant: 'contained',
      },
      public: {
        color: 'oppositeColor',
        variant: 'text',
      },
    },
  };

  return (
    <Modal maxWidth="lg" open={open} onClose={onClose}>
      <ModalContent>
        <Stack direction="row" gap={15}>
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
                  <AddIcon sx={{ width: '50px', height: '50px' }} />
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    ref={fileInput}
                    onChange={onUpload}
                  />
                </IconButton>
              </NoImageContent>
            ) : (
              <></>
              // <img src={imageSrc} alt="" style={{ width: '300px', height: '180px' }} />
            )}
            <Stack>{write?.title}</Stack>
          </Preview>
          <Stack gap={8}>
            <Stack>
              <SectionTitle>공개설정</SectionTitle>
              <ButtonContainer>
                <Button
                  onClick={() => setPrivateMode('public')}
                  color={privateMap.publicButton[privateMode].color}
                  variant={privateMap.publicButton[privateMode].variant}>
                  공개
                </Button>
                <Button
                  onClick={() => setPrivateMode('private')}
                  color={privateMap.privateButton[privateMode].color}
                  variant={privateMap.privateButton[privateMode].variant}>
                  비공개
                </Button>
              </ButtonContainer>
            </Stack>
            <Stack>
              <SectionTitle>태그목록</SectionTitle>
              <TagContent>
                {write?.tags?.map((tag, i) => {
                  return <Chip color="primary" sx={{ marginBottom: '8px' }} key={i} label={tag} />;
                })}
              </TagContent>
            </Stack>
          </Stack>
        </Stack>
      </ModalContent>
      <ModalActions>
        <ModalButton onClose={onClose} action={{ content: '글 게시', action: actionClick }} />
      </ModalActions>
      <Dialog
        open={postConfirmOpen}
        onClose={() => setPostConfirmOpen(false)}
        message="글을 게시하시겠습니까?"
        action={{
          content: '확인',
          action: postOnClick,
        }}
      />
    </Modal>
  );
}

export default SaveModal;
