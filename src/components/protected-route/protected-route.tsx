// src\components\protected-route\protected-route.tsx

import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from '@store';
import {
  selectIsAuthChecked,
  selectUser
} from '../../services/user/user-slice';
import { Preloader } from '@ui';

export const ProtectedRoute = ({
  children
}: {
  children: React.ReactElement;
}) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  console.log('isAuthChecked', isAuthChecked);

  if (user) return children;
  return (
    <Navigate
      to='/login'
      state={{
        from: {
          ...location,
          background: location.state?.background,
          state: null
        }
      }}
      replace
    />
  );
};

export const UnAuthRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();
  const backgroundLocation = location.state?.from?.background || null;
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthChecked) return <Preloader />;
  if (!user) return children;

  return (
    <Navigate replace to={from} state={{ background: backgroundLocation }} />
  );
};
