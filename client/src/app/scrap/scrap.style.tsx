import { styled } from '@mui/material/styles';


export const PostArea = styled('div') ({
    marginLeft: '80px',
    width: '400px',
})

export const ScrapList = styled('div') (({theme}) => ({
    color: theme.palette.oppositeColor.main,
    margin: '10px 30px',
    fontSize: '35px',
}));

export const PostAreaComponent = styled('div') (({theme}) => ({
    color: theme.palette.oppositeColor.main,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
}));