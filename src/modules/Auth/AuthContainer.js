import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from 'utils';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components';

const AuthContainer = () => {
  const user = useSelector((state) => state.userData.user);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectVerification = () => {
      let token = getToken();
      if (token && user) {
        navigate('/dashboard');
      }
    };
    redirectVerification();
  }, [user]);

  return <Loader />;
};

export default AuthContainer;
