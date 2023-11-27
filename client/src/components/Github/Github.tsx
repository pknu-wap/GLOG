import React from 'react';
import Modal from '../Modal/Modal';
import { ModalTitle } from '../Modal/Modal.style';
import { PostRepository, useGetRepositoryQuery } from '@/api/github-api';
import { Stack } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function Github({
  open,
  onClose,
  categoryId,
}: {
  open: boolean;
  onClose: () => void;
  categoryId?: number;
}) {
  const queryClient = useQueryClient();
  const { data: datas } = useGetRepositoryQuery();

  const putAllowFriendIdCreateQuery = useMutation(PostRepository, {
    onSuccess: () => {
      queryClient.invalidateQueries(['repository']);
    },
  });
  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle>Repository 선택</ModalTitle>
      {datas?.map((data, i) => {
        return (
          <Stack
            onClick={() => putAllowFriendIdCreateQuery.mutate({ category: categoryId, repo: i })}
            key={i}>
            {data}
          </Stack>
        );
      })}
    </Modal>
  );
}

export default Github;
