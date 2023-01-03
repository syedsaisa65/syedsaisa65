import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '@mui/material';

function CustomContainer({ children, maxWidth, ...rest }) {
  return (
    <Container maxWidth={maxWidth ? maxWidth : 'xl'} {...rest}>
      {children}
    </Container>
  );
}

CustomContainer.propTypes = {
  children: PropTypes.any,
  maxWidth: PropTypes.string
};

export default CustomContainer;
