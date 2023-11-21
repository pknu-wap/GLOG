import { PostTemplateApi, PostTemporaryApi } from '@/api/write-api';
import { Dialog } from '@/components/Dialog/Dialog';
import Toast from '@/components/Toast/Toast';
import { ModalType } from '@/types/common';
import { ITemplateAdd } from '@/types/dto';
import { useWriteProps } from '@/util/useWriteProps';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

function SaveDialog({
  image,
  open,
  onClose,
  saveType,
}: ModalType & { saveType: '임시' | '템플릿'; image: string }) {
  const queryClient = useQueryClient();
  const write = useWriteProps();
  const [toastOpen, setToastOpen] = useState(false);

  const postTemplateAddTemplate = useMutation(PostTemplateApi, {
    onSuccess() {
      queryClient.invalidateQueries(['template']);
      setToastOpen(true);
    },
  });

  const postTemporaryAddTemplate = useMutation(PostTemporaryApi, {
    onSuccess() {
      queryClient.invalidateQueries(['temporaries']);
      setToastOpen(true);
    },
  });

  // FormData 생성 함수
  const createFormData = (postData: ITemplateAdd) => {
    const formData = new FormData();
    formData.append('thumbnail', postData.thumbnail);

    const json = JSON.stringify(postData.postBasicDto);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    formData.append('postBasicDto', blob);

    return formData;
  };

  const postTemplateOnClick = () => {
    // 폼 데이터 생성
    const formData = createFormData({
      thumbnail: image,
      postBasicDto: {
        title: write?.title ?? '',
        content: write?.content ?? '',
        thumbnail: '',
        hashtags: write?.tags ?? [],
      },
    });

    postTemplateAddTemplate.mutate(formData);
  };

  const postTemporaryOnClick = () => {
    // 폼 데이터 생성
    const formData = createFormData({
      thumbnail: image,
      postBasicDto: {
        title: write?.title ?? '',
        content: write?.content ?? '',
        thumbnail: '',
        hashtags: write?.tags ?? [],
      },
    });

    postTemporaryAddTemplate.mutate(formData);
  };

  const typeToAction = {
    임시: () => postTemporaryOnClick(),
    템플릿: () => postTemplateOnClick(),
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        message={`${saveType} 저장 하시겠습니까?`}
        action={{
          content: '확인',
          action: typeToAction[saveType],
        }}
      />
      <Toast
        toastMessage={'성공적으로 템플릿이 추가되었습니다.'}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

export default SaveDialog;
