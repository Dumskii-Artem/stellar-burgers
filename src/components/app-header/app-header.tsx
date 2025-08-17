// src\components\app-header\app-header.tsx
import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { userSelector } from '../../services/user/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelector)?.name;

  return <AppHeaderUI userName={userName ? userName : ''} />;
};
