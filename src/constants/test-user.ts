import { TUser } from '@utils-types';

export const testUser: TUser = {
  name: 'Иван Иванов',
  email: 'ivan@example.com'
};

export const anotherTestUser: TUser = {
  name: 'Ольга Петрова',
  email: 'olga@example.com'
};

export const testLoginResponse = {
  user: testUser,
  accessToken: 'Bearer test-access-token',
  refreshToken: 'test-refresh-token'
};
