import { Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';

// eslint-disable-next-line no-unused-vars
const NoDataFound = ({ icon, message }) => {
  const classes = useStyles();
  return (
    <Box className={classes.noDataFound}>
      <Typography>{message ? message : 'No Data Found'}</Typography>
    </Box>
  );
};

NoDataFound.propTypes = {
  icon: PropTypes.any,
  message: PropTypes.string
};

export default NoDataFound;
