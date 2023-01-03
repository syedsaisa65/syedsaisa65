import React from 'react';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Avatar } from '@mui/material';
import useStyle from './style';
const MemberChip = ({ member, enableRemove }) => {
  const { image, displayName, project } = member;
  const classes = useStyle();
  return (
    <div className={classes.chipMain}>
      <div className={`d_flex d_flex_align ${classes.chip}`}>
        <Avatar alt={displayName} src={image} sx={{ width: 24, height: 24 }} />
        <Box className={classes.textWrap}>
          <p className={classes.name}>{displayName}</p>
          <p className={classes.subtitle}>{project}</p>
        </Box>
        {enableRemove && <CloseRoundedIcon fontSize="small" className={classes.remove} />}
      </div>
    </div>
  );
};
MemberChip.propTypes = {
  member: PropTypes.object,
  enableRemove: PropTypes.bool
};
export default MemberChip;
