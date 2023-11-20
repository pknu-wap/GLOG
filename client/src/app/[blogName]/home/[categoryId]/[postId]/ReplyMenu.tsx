import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/material';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';

export default function ReplyBasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack>
      <Button
        onClick={handleClick}
        sx={{ padding: '0 10px 0 0', minWidth: "24px"}}>
        <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>인기순</MenuItem>
        <MenuItem onClick={handleClose}>최신순</MenuItem>
        <MenuItem onClick={handleClose}>오래된순</MenuItem>
      </Menu>
    </Stack>
  );
}