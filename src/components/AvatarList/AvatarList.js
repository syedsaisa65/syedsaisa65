import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import useStyle from './style';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';
import { PopoverModal } from 'components';

function AvatarList({ max, avatarArray }) {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openMoreList = (e) => {
    e?.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AvatarGroup className={'d_flex_align'} onClick={(e) => e.stopPropagation()}>
        {avatarArray?.slice(0, max - 1)?.map((avatar, index) => {
          return (
            <Tooltip
              title={avatar}
              key={index}
              arrow
              placement="top"
              onClick={(e) => e.stopPropagation()}>
              <Avatar
                alt={avatar}
                src="/static/images/avatar/1.jpg"
                className={classes.userImage}
              />
            </Tooltip>
          );
        })}
        {avatarArray.length >= max ? (
          // <Tooltip arrow placement="top">
          <Box
            aria-describedby={id}
            className={`${classes.userImage} d_flex d_flex_align d_flex_content_center moreBtn `}
            onClick={(e) => openMoreList(e)}>
            +{avatarArray.length - max + 1}
          </Box>
        ) : (
          // </Tooltip>
          ''
        )}
        <PopoverModal
          open={open}
          anchorEl={anchorEl}
          id={id}
          handleClose={handleClose}
          className={`${classes.avtarModal}`}>
          {/* {avatarArray.slice(max - 1, avatarArray?.length)?.map((item, index) => { */}
          {avatarArray?.map((item, index) => {
            return (
              <Box className={`d_flex d_flex_align ${classes.avatarList}`} key={index}>
                <Avatar
                  className={`text_upperCase ${classes.popupAvtar}`}
                  alt={item}
                  src={item}
                  sx={{ width: 24, height: 24 }}
                />
                <span className={classes.title}>{item}</span>
              </Box>
            );
          })}
        </PopoverModal>
      </AvatarGroup>
    </>
  );
}

AvatarList.propTypes = {
  max: PropTypes.number,
  avatarArray: PropTypes.array
};

export default AvatarList;
