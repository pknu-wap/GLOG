import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import { ModalType } from '@/types/common';
import { Stack } from '@mui/material';
import FriendListComponent, { FriendModalArea, TopStack } from './FriendModal.style';
import BasicMenu from './FriendModalMenu';

function FriendModal({ open, onClose }: ModalType) {
  const backendFriendInfo = [
    {
      userFriendResponse: {
        count: 0,
        userSimpleDtos: [
          {
            relationship: 'friending',
            haveNewPost: true,
            userSimpleDto: {
              id: 'long',
              nickname: 'chaeyeon',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'junseo',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: true,
            userSimpleDto: {
              id: 'long',
              nickname: 'duyoung',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: true,
            userSimpleDto: {
              id: 'long',
              nickname: 'Jongkyeong',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'dohyeon',
              imageUrl: 'string',
            },
          },
          {
            relationship: 'friending',
            haveNewPost: false,
            userSimpleDto: {
              id: 'long',
              nickname: 'dohyeon',
              imageUrl: 'string',
            },
          },
        ],
      },
    },
  ];

  const friendCount = backendFriendInfo[0].userFriendResponse.userSimpleDtos.length;
  return (
    <Modal open={open} maxWidth="lg" onClose={onClose}>
      <ModalContent>
        <FriendModalArea>
          <TopStack>
            <Stack marginBottom="5px">친구들</Stack>
            <Stack>{friendCount}명</Stack>
          </TopStack>
          <Stack flexDirection="row" justifyContent="left" marginBottom="5px">
            <BasicMenu></BasicMenu>
            <Stack>정렬기준</Stack>
          </Stack>
          <Stack flexDirection="column" width="45vw" maxHeight="200px">
            {backendFriendInfo[0].userFriendResponse.userSimpleDtos.map((friendInfo) => {
              return (
                <FriendListComponent
                  key={friendInfo.userSimpleDto.id}
                  nickname={friendInfo.userSimpleDto.nickname}
                  profileImg={friendInfo.userSimpleDto.nickname}
                  haveNewPost={friendInfo.haveNewPost}
                />
              );
            })}
          </Stack>
        </FriendModalArea>
      </ModalContent>
    </Modal>
  );
}

export default FriendModal;
