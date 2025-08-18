import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { loginUserThunk } from '../../services/user/actions';
import { selectUserLoading } from '../../services/user/user-slice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('artem812@mail.ru');
  const [password, setPassword] = useState('123456789');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
  };

  // это как-то не видно, что срабатывает
  const loading = useSelector(selectUserLoading);
  if (loading) return <Preloader />;

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
