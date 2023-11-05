import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FriendModalArea = styled(Stack)({
    display: "flex",
    justifyContent: "center",
    alignItems: "space-between",
    flexDirection: "column",
    //반응형(Mobile L - 425px 부터 미흡)
    width: "50vw",
    height: "100%",
    maxWidth: "550px",
    padding: "10px 20px",
})

export const TopStack = styled(Stack)(({theme}) => ({
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "10px",
}));


const ProfileImage = styled(Stack)(({ imageSrc }: {imageSrc: string}) => ({
    backgroundColor: 'wheat',
    backgroundImage: `url(${imageSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
}));

function FriendListComponent({
    nickname,
    profileImg,
    haveNewPost
}: {nickname: string, profileImg: string, haveNewPost: boolean}) {
    return (
        <Stack
        margin="6px 0"
        flexDirection="row">
            <ProfileImage
                imageSrc={profileImg}
            />

            <Stack
            flexDirection="row"
            whiteSpace= "nowrap"
            overflow="hidden"
            textOverflow="ellipsis">
                <Stack
                margin="0 10px 0 5px">
                    {nickname}
                </Stack>
                {/* new friend로 추가? */}
                {haveNewPost ? (
                    <Stack 
                    color="#00BFFF">
                        New Post
                    </Stack>
                ) : (
                    <Stack></Stack>
                )}
            </Stack>
        </Stack>
    )
}



export default FriendListComponent;