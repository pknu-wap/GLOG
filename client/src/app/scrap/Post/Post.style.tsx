import { styled } from '@mui/material/styles';

export const Post = styled('div') (({theme}) => ({
    backgroundColor: theme.palette.subColor.main,
    margin: '30px',
    width: '250px',
    height: '200px',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px 1px rgba(0, 0, 0, 0.05)',
    transition: 'all .35s ease-in-out',
    ':hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0px 0px 20px 1px rgba(0, 0, 0, 0.15)',
    },
}))


export const Thumbnail = styled('div') ({
    position: 'relative',
    width: '100%',
    height: '80%',
    borderRadius: '15px',
})

export const CostomizeButton = styled('button') ({
    position: 'absolute',
    //나중에 버튼 테두리 없앨때 border: 'none', 추가
    border: 'none',
    backgroundColor: 'transparent',
    color: '#C4C4C4',
    right: '7px',
    top: '10px',
})

export const PostPopular = styled('div') ({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    opacity: '0',
    transition: 'all .35s ease-in-out',
    ':hover': {
        opacity: '1',
    },
})

export const Image = styled('img') ({
    width: '100%',
    height: '100%',
})

export const Icon = styled('i') ({

})

export const Title = styled('div') ({
    marginTop: '10px',
    fontSize: '18px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    marginLeft: '2px',
})