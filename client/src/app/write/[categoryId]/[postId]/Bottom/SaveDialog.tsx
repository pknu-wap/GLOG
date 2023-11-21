import { PostTemplateApi } from '@/api/write-api';
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

  const postAddTemplate = useMutation(PostTemplateApi, {
    onSuccess() {
      queryClient.invalidateQueries(['template']);
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

  const postOnClick = () => {
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

    postAddTemplate.mutate(formData);
  };

  const typeToAction = {
    임시: () => console.log('임시'),
    템플릿: () => postOnClick(),
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
