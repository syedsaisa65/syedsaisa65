import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';
import useStyle from './style';

const CustomCheckbox = ({ label }) => {
  const classes = useStyle();
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label={label}
      className={classes.checkboxMain}
    />
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string
};

export default CustomCheckbox;
