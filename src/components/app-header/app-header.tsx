// src\components\app-header\app-header.tsx
import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { selectUser } from '../../services/user/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser)?.name;

  return <AppHeaderUI userName={userName ? userName : ''} />;
};
