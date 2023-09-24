import { styled } from '@mui/material/styles';

export const Post = styled('div') (({theme}) => ({
    backgroundColor: theme.palette.subColor.main,
    margin: '30px',
    width: '250px',
    height: '200px',
    padding: '10px',
    borderRadius: '10px',
    transition: 'transform .35s ease-in-out',
    boxShadow: '0px 0px 20px 1px rgba(0, 0, 0, 0.1)',
    ':hover': {
        transform: 'translateY(-20px)',
    },
}))


export const Thumbnail = styled('div') ({
    width: '100%',
    height: '80%',
})

export const Image = styled('img') ({
    width: '100%',
    height: '100%',
})

export const Title = styled('div') ({
    marginTop: '10px',
    fontSize: '18px'
})