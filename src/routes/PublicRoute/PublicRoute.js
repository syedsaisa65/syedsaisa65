import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getToken } from 'utils/index';

const PublicRoute = ({ children }) => {
  if (getToken()) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.any
};
export default PublicRoute;
