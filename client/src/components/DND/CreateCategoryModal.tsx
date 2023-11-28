import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { ModalActions, ModalContent, ModalTitle } from '../Modal/Modal.style';
import { Stack, TextField } from '@mui/material';
import ModalButton from '../Modal/ModalButton';
import { ModalType } from '@/types/common';
import Button from '../Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  PostCategoryApi } from '@/api/category-api';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function CreateCategoryModal({ open, onClose }: ModalType) {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [isPrCategory, setIsPrCategory] = useState<boolean>(Boolean);
  const postCategoryQuery = useMutation(PostCategoryApi, {
    onSuccess() {
      queryClient.invalidateQueries(['guestbook']);
    },
  });
  const postCategoryClick = () => {
    const newCategoryBody = {
      categoryName: categoryName,
      isPrCategory: isPrCategory,
      repositoryUrl: repositoryUrl,
    };
    postCategoryQuery.mutate(newCategoryBody);
    onClose();
  };


  return (
    <Modal open={open} onClose={onClose}>
      <ModalTitle fontSize="24px" fontWeight="bold">
        카테고리 생성
      </ModalTitle>
      <ModalContent sx={{ '&&.MuiDialogContent-root': { paddingTop: '0px' } }}>
        <Stack width="600px" spacing={5}>
            <Stack direction="row" alignItems="center" spacing={3}>
                <Stack fontSize="18px" fontWeight="bold">
                  카테고리 이름 :
                </Stack>
                <TextField variant="standard" onChange={(e) => {
                    setCategoryName(e.target.value);
                    }} 
                />
            </Stack>
          <Stack flexDirection='row' fontSize="18px" fontWeight="bold">
            깃허브 연동 여부 : 
                <Stack flexDirection='row' marginLeft='10px'>
                    <Button
                      sx={{minWidth: '36px', height: '36px', padding: '0'}}
                      onClick={() => {
                        setIsPrCategory(true);
                      }}
                      color="success">
                      <CheckIcon />
                    </Button>

                    <Button
                      sx={{minWidth: '36px', height: '36px', padding: '0'}}
                      onClick={() => {
                        setIsPrCategory(false);
                      }}
                      color="error">
                      <CloseIcon />
                    </Button>
                </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack fontSize="18px" fontWeight="bold">
              레포지토리 URL :
            </Stack>
            <TextField variant="standard" onChange={(e) => {
              setRepositoryUrl(e.target.value);
            }} />
          </Stack>
        </Stack>
      </ModalContent>
      <ModalActions>
        <ModalButton
          onClose={onClose}
          action={{ content: '생성', action: postCategoryClick }}
        />
      </ModalActions>
    </Modal>
  );
}

export default CreateCategoryModal;