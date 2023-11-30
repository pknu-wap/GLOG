/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostTemplateApi, PostTemporaryApi, PostWriteApi, UpdateWriteApi } from '@/api/write-api';
import { usePathname, useRouter } from 'next/navigation';
import { WriteModalType, WriteProps } from '@/util/useWriteProps';
import { enqueueSnackbar } from 'notistack';
import { useGetBlogUrlQuery } from '@/api/blog-api';
import { IBlogUrl } from '@/types/dto';

function SaveModal({
  open,
  onClose,
  writeProps,
  modalType,
  categoryId,
  postId,
}: ModalType & {
  writeProps: WriteProps;
  modalType: WriteModalType;
  categoryId?: number;
  postId?: number;
}) {
  const pathname = usePathname();
  const [postConfirmOpen, setPostConfirmOpen] = useState<boolean>(false);
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>(null);
  const [image, setImage] = useState('');
  const [privateMode, setPrivateMode] = useState<'private' | 'public'>('private');
  const queryClient = useQueryClient();
  // const isPrUpdate = pathname.startsWith('/write/pr/update');
  const isPr = pathname.startsWith('/write/pr');
  const { data: blogUrlData } = useGetBlogUrlQuery({
    categoryId: categoryId,
  });
  const [blogUrl, setBlogUrl] = useState<IBlogUrl>();

  const postWriteCreateQuery = useMutation(PostWriteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      router.push(`/${blogUrl}`);
      enqueueSnackbar({ message: '글 작성이 완료되었습니다.', variant: 'success' });
    },
    onError: (e: Error) => {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    },
  });

  const updateWriteCreateQuery = useMutation(UpdateWriteApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      router.push(`/${blogUrl}`);
      enqueueSnackbar({ message: '글 수정이 완료되었습니다.', variant: 'success' });
    },
    onError: (e: Error) => {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    },
  });

  const postTemplateAddTemplate = useMutation(PostTemplateApi, {
    onSuccess() {
      queryClient.invalidateQueries(['template']);
      enqueueSnackbar({ message: '템플릿 추가가 완료되었습니다.', variant: 'success' });
    },
    onError: (e: Error) => {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    },
  });

  const postTemporaryAddTemplate = useMutation(PostTemporaryApi, {
    onSuccess() {
      queryClient.invalidateQueries(['temporaries']);
      enqueueSnackbar({ message: '임시저장 글 저장이 완료되었습니다.', variant: 'success' });
    },
    onError: (e: Error) => {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    },
  });

  const actionClick = () => {
    setPostConfirmOpen(true);
  };

  // FormData 생성 함수

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createFormData = (postData: any) => {
    const formData = new FormData();
    formData.append('thumbnail', postData.thumbnail);

    const json = JSON.stringify(postData.postCreateRequest);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    formData.append('postCreateRequest', blob);

    return formData;
  };

  const createToolFormData = (postData: any) => {
    const formData = new FormData();
    formData.append('thumbnail', postData.thumbnail);

    const json = JSON.stringify(postData.postBasicDto);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    formData.append('postBasicDto', blob);

    return formData;
  };

  const postOnClick = () => {
    onClose();
    const formData = createFormData({
      thumbnail: image ?? null,
      postCreateRequest: {
        title: writeProps?.title,
        content: writeProps?.content,
        isPrivate: privateMode === 'private' ? true : false,
        prId: isPr ? Number(categoryId) : undefined,
        hashtags: writeProps?.tags,
        categoryId: Number(categoryId),
      },
    });

    postWriteCreateQuery.mutate(formData);
  };

  const postUpdateOnClick = () => {
    onClose();
    const formData = createFormData({
      thumbnail: image ?? null,
      postCreateRequest: {
        title: writeProps?.title,
        content: writeProps?.content,
        isPrivate: privateMode === 'private' ? true : false,
        // prId: isPrUpdate ? Number(postId) : undefined,
        hashtags: writeProps?.tags,
        categoryId: Number(categoryId),
        postId: Number(postId),
      },
    });

    updateWriteCreateQuery.mutate(formData);
  };

  const postTemplateOnClick = () => {
    onClose();

    const formData = createToolFormData({
      thumbnail: image ?? null,
      postBasicDto: {
        title: writeProps?.title ?? '',
        content: writeProps?.content ?? '',
        thumbnail: null,
        hashtags: writeProps?.tags ?? [],
      },
    });

    postTemplateAddTemplate.mutate(formData);
  };

  const postTemporaryOnClick = () => {
    onClose();

    const formData = createToolFormData({
      thumbnail: image ?? null,
      postBasicDto: {
        title: writeProps?.title ?? '',
        content: writeProps?.content ?? '',
        thumbnail: null,
        hashtags: writeProps?.tags ?? [],
      },
    });

    postTemporaryAddTemplate.mutate(formData);
  };

  const onUpload = async (e: any) => {
    const file = e.target.files[0];
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

  useEffect(() => {
    setBlogUrl(blogUrlData);
  }, [blogUrlData]);

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
              <img src={imageSrc} alt="" style={{ width: '300px', height: '180px' }} />
            )}
            <Stack>{writeProps?.title}</Stack>
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
                {writeProps?.tags?.map((tag, i) => {
                  return <Chip color="primary" sx={{ marginBottom: '8px' }} key={i} label={tag} />;
                })}
              </TagContent>
            </Stack>
          </Stack>
        </Stack>
      </ModalContent>
      <ModalActions>
        <ModalButton onClose={onClose} action={{ content: '전송', action: actionClick }} />
      </ModalActions>
      <Dialog
        open={postConfirmOpen}
        onClose={() => setPostConfirmOpen(false)}
        message="저장하시겠습니까?"
        action={{
          content: '확인',
          action:
            modalType === 'create'
              ? postOnClick
              : modalType === 'update'
              ? postUpdateOnClick
              : modalType === 'template'
              ? postTemplateOnClick
              : postTemporaryOnClick,
        }}
      />
    </Modal>
  );
}

export default SaveModal;
