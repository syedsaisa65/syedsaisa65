import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';
import { getToken, removeToken } from 'utils/index';
import { setUserData } from 'store/slice/userSlice';
const PrivateRoute = ({ children }) => {
  const { accounts } = useMsal();
  const [isValidate, setIsValidate] = useState(false);
  const [isAccessiblePage, setIsAccessiblePage] = useState(false);
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuthAndGetUserDetail = () => {
      const token = getToken();
      if (token) {
        if (!user) {
          if (accounts.length > 0) {
            dispatch(setUserData(accounts[0]));
            setIsAccessiblePage(true);
          } else {
            removeToken();
          }
        } else {
          setIsAccessiblePage(true);
        }
      }
      setIsValidate(true);
    };
    verifyAuthAndGetUserDetail();
  }, []);

  if (!isValidate) {
    return null;
  }

  if (isValidate && !isAccessiblePage) {
    localStorage.setItem('referralUrl', window.location.pathname);
    return <Navigate to="/" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.any
};
export default PrivateRoute;
