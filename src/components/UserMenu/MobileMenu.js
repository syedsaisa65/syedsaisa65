import React from 'react';
import { Box, Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import useStyle from './style';

const MobileMenu = () => {
  const classes = useStyle();
  const { user } = useSelector((state) => state.userData);
  return (
    <Box className="d_flex d_flex_align mobile_menu" sx={{ p: 1 }}>
      <div className="user_image">
        <IconButton size="small">
          <Avatar alt="User Name" src="" sx={{ width: 45, height: 45 }} />
        </IconButton>
      </div>
      <div className="user_info">
        <h4 className={`text_upperCase ${classes.userName}`}>
          {user?.name ? user?.name : 'USER NAME'}
        </h4>
      </div>
    </Box>
  );
};

export default MobileMenu;
