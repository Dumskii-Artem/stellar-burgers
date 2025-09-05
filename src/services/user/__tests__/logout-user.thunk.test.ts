// src\services\user\__tests__\logout-user.thunk.test.ts

import { logoutUserThunk } from '../actions';
import { userReducer, initialState } from '../user-slice';

describe('logoutUserThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(global, 'localStorage', {
      value: {
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('pending → loading: true, error: null', () => {
    const action = { type: logoutUserThunk.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('fulfilled → очищает user, удаляет токены', () => {
    const action = { type: logoutUserThunk.fulfilled.type };
    const prevState = {
      ...initialState,
      user: { email: 'user@mail.com', name: 'User' },
    };
    const state = userReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: null,
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('rejected → loading: false, error = payload', () => {
    const action = {
      type: logoutUserThunk.rejected.type,
      payload: 'Ошибка выхода из системы',
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка выхода из системы',
    });
  });
});
