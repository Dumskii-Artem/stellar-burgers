// src\services\user\__tests__\set-user.reducer.test.ts

import { setUser, userReducer } from '../user-slice';
import { userTestInitialState } from '../../../constants/test-user-state';
import { testUser } from '../../../constants/test-user';

describe('setUser reducer', () => {
  it('устанавливает пользователя в стейт', () => {
    const action = setUser(testUser);
    const state = userReducer(userTestInitialState, action);

    expect(state).toEqual({
      ...userTestInitialState,
      user: testUser
    });
  });
});
