// src\components\protected-route\protected-route.tsx

import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactElement;
  onlyUnAuth?: boolean; // флаг, нужен ли доступ только неавторизованным
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children,onlyUnAuth = false}) => {
  // Позже тут будет логика проверки авторизации:
  // const isAuth = useSelector((state) => state.user.isAuth);
  // if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

// export default ProtectedRoute;
