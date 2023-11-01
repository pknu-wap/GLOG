import Button from '@/components/Button/Button';
import CenterContent from '@/components/Layout/CenterContent';
import List from '@/components/List/List';
import { Stack } from '@mui/material';
import React from 'react';

function page() {
  return (
    <CenterContent maxWidth="1080px">
      <Stack fontSize="24px" marginBottom="8px">
        작성하지 않은 PR
      </Stack>
      <Stack p={2} direction="row" spacing={4} overflow={'scroll'}>
        {Array.from({ length: 12 }, (_, i) => (
          <Stack
            key={i}
            sx={{
              transition: 'all .35s ease-in-out',
              cursor: 'pointer',
              ':hover': { transform: 'translateY(-4px)' },
            }}
            minWidth="220px"
            height="124px"
            bgcolor="primary.main"
            p={4}
            borderRadius="8px"
            justifyContent="space-around">
            <Stack direction="row" justifyContent="space-between">
              <Stack color="#000000" fontSize="20px" fontWeight="bold">
                #77
              </Stack>
              <img
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe4%2F9a%2Ff8%2Fe49af87c36b78490745115cc14b5a80e.gif&type=ff332_332"
                alt="profileImage"
              />
            </Stack>
            <Stack
              color="#000000"
              sx={{ wordBreak: 'break-all' }}
              overflow="hidden"
              textOverflow="ellipsis"
              display="inline"
              whiteSpace="nowrap">
              로딩구현 ㅏㅁㅇ나러ㅏㅇㅁㄹ ㄴ아 ㄴㅇ라ㅓ ㄴ ㄹ
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack margin="40px 0px 8px 0px" fontSize="24px">
        작성한 PR 목록
      </Stack>
      {Array.from({ length: 12 }, (_, i) => (
        <List
          key={i}
          width="100%"
          content={'asdf'}
          buttonAction={
            <Stack direction="row">
              <Button size="small" color="primary">
                수정
              </Button>
              <Button size="small" color="error">
                삭제
              </Button>
            </Stack>
          }
        />
      ))}
    </CenterContent>
  );
}

export default page;
