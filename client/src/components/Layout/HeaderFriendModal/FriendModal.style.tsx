import Button from '@/components/Button/Button';
import PageLink from '@/components/PageLink/PageLink';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FriendModalArea = styled(Stack)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'space-between',
  flexDirection: 'column',
  //FIXME:반응형(Mobile L - 425px 부터 미흡)
  width: '50vw',
  height: '100%',
  maxWidth: '550px',
  padding: '10px 20px',
});

export const TopStack = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: '10px',
}));

const ProfileImage = styled(Stack)(({ imageSrc }: { imageSrc: string }) => ({
  backgroundColor: 'wheat',
  backgroundImage: `url(${imageSrc})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  minWidth: '30px',
}));

export const UserName = styled(Stack)({
  flexDirection: 'row',
  whiteSpace: 'nowrap',
  overflow: 'auto',
});

export const NewPost = styled(Stack)({
  color: "#00BFFF",
  transition: "all 0.5s ease-in-out",
  "::before": {
    content: "New Post",
  },
  ":hover::before": {
    content: "보러가기",
  }
})



function FriendListComponent({
  nickname,
  profileImg,
  haveNewPost,
  recentPostId,
  relationship,
}: {
  nickname: string;
  profileImg: string;
  haveNewPost: boolean;
  recentPostId: string;
  relationship: string;
}) {

  return (
    <Stack>
      <Stack margin="6px 0" flexDirection="row">
        <ProfileImage imageSrc={profileImg} />

        <UserName>
          <Stack margin="0 10px 0 5px">{nickname}</Stack>
          {/*FIXME: new friend로 추가? */}
          {(relationship === "friend") ? (
            haveNewPost ? (
              <Button>
                <PageLink href={recentPostId} color='#00BFFF'>
                  <NewPost></NewPost>
                </PageLink>
              </Button>
            ) : (
            <Stack></Stack>
            )
          ) : (relationship === "friending")? (
            <Stack>요청 중</Stack>
          ) : (relationship === "friended") ? (
            <Button>요청 받기</Button>
          ) : (
            <Stack></Stack>
          )}
        </UserName>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
}

export default FriendListComponent;
