import IconButton from '@/components/Button/IconButton';
import { Pagination } from '@mui/material';
import { Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Button from '@/components/Button/Button';

export const ThumbnailArea = styled(Stack)({
  width: '100%',
  height: '35vh',
  position: 'relative',
});

export const BlackContainer = styled(Stack)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ImageContainer = styled(Stack)(({ imageSrc }: { imageSrc: string }) => ({
  backgroundAttachment: 'fixed',
  backgroundImage: `url(${imageSrc})`,
  backgroundSize: '100% 38vh',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
}));

export const PostReply = styled(Stack)({
  height: '100%',
  flexDirection: 'column',
});

export const ReplyHandle = styled(Stack)({
  flexDirection: 'row',
  marginBottom: '20px',
});

export const ReplyCount = styled(Stack)({});

export const WriteReply = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

export const GetReplies = styled(Stack)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maring: '30px 0',
});

export const ReplyPagenation = styled(Pagination)({});

const ReplyMainInfo = styled(Stack)({
  flexDirection: 'row',
});

const ReplySubInfo = styled(Stack)({
  flexDirection: 'row',
});

const ReplyLike = styled(Stack)({
  flexDirection: 'row',
});

const ChangeReply = styled(Stack)({});

function RepliesComponent({
  profileImage,
  nickname,
  message,
  likesCount,
  isLiked,
  isEdit,
}: {
  profileImage: string;
  nickname: string;
  message: string;
  likesCount: number;
  isLiked: boolean;
  isEdit: boolean;
}) {
  return (
    <Stack flexDirection={'column'}>
      <ReplyMainInfo>
        <Avatar sx={{ width: 24, height: 24 }} alt="" src={profileImage}></Avatar>
        <Stack>
          <Stack>{nickname}</Stack>
          <Stack>{message}</Stack>
        </Stack>
      </ReplyMainInfo>
      <ReplySubInfo>
        <ReplyLike>
          <IconButton>
            {isLiked ? <ThumbUpAltIcon></ThumbUpAltIcon> : <ThumbUpOffAltIcon></ThumbUpOffAltIcon>}
          </IconButton>
          <ChangeReply>
            {isEdit ? <Button>수정하기</Button> : <Button>신고하기</Button>}
          </ChangeReply>
          {likesCount}
        </ReplyLike>
      </ReplySubInfo>
    </Stack>
  );
}

export default RepliesComponent;
