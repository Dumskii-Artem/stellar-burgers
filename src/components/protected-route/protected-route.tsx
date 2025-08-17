// src\components\protected-route\protected-route.tsx

import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from '@store';
import {
  isAuthCheckedSelector,
  userSelector
} from '../../services/user/user-slice';
import { Preloader } from '@ui';

export const ProtectedRoute = ({
  children
}: {
  children: React.ReactElement;
}) => {
  const user = useSelector(userSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;
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
  const user = useSelector(userSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  if (!isAuthChecked) return <Preloader />;
  if (!user) return children;
  return <Navigate to='/' replace />;
};
