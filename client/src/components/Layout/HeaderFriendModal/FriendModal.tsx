import Modal from '@/components/Modal/Modal';
import { ModalContent } from '@/components/Modal/Modal.style';
import { ModalType } from '@/types/common';
import { Stack } from '@mui/material';
import FriendListComponent, { TopStack } from './FriendModal.style';
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
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="space-between"
          flexDirection="column"
          //반응형(Mobile L - 425px 부터 미흡)
          width="50vw"
          height="100%"
          maxWidth="550px"
          padding="10px 20px">
          <TopStack>
            <Stack marginBottom="5px">친구들</Stack>
            <Stack>{friendCount}명</Stack>
          </TopStack>
          <Stack flexDirection="row" justifyContent="left" marginBottom="10px">
            <BasicMenu></BasicMenu>
            <Stack marginLeft="5px">정렬기준</Stack>
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
        </Stack>
      </ModalContent>
    </Modal>
  );
}

export default FriendModal;
