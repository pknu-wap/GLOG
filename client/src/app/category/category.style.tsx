import { Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ScrapList = styled('div')(({ theme }) => ({
  color: theme.palette.oppositeColor.main,
  margin: '10px 30px',
  fontSize: '35px',
}));

export const PostAreaComponent = styled('div')(({ theme }) => ({
  color: theme.palette.oppositeColor.main,
  display: 'flex',
  flexWrap: 'wrap',
}));

export const PostPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
