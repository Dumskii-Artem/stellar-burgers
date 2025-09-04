// src\services\user\__tests__\set-is-auth-checked.reducer.test.ts

import { userReducer } from '../user-slice';
import { userTestInitialState } from '../../../constants/test-user-state';
import { setIsAuthChecked } from '../actions';

describe('setIsAuthChecked reducer', () => {
  it('устанавливает флаг isAuthChecked в true', () => {
    const action = setIsAuthChecked(true);
    const state = userReducer(userTestInitialState, action);

    expect(state).toEqual({
      ...userTestInitialState,
      isAuthChecked: true
    });
  });

  it('устанавливает флаг isAuthChecked в false', () => {
    const action = setIsAuthChecked(false);
    const state = userReducer(userTestInitialState, action);

    expect(state).toEqual({
      ...userTestInitialState,
      isAuthChecked: false
    });
  });
});
