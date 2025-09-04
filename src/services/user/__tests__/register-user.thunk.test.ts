// src\services\user\__tests__\register-user.thunk.test.ts

import { registerUserThunk } from '../actions';
import { userReducer, initialState } from '../user-slice';
import { setCookie } from '../../../utils/cookie';
import { TUser } from '@utils-types';

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

const testUser = {
  email: 'test@example.com',
  name: 'Тестовый пользователь'
} as TUser;

const payload = {
  user: testUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

// ✅ Мокаем localStorage
beforeAll(() => {
  const localStorageMock = (function () {
    let store: Record<string, string> = {};

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
  });
});

describe('registerUserThunk', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('pending → loading: true, error: null', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('fulfilled → сохраняет пользователя, токены, isAuthChecked: true', () => {
    const action = { type: registerUserThunk.fulfilled.type, payload };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: testUser,
      isAuthChecked: true
    });

    expect(setCookie).toHaveBeenCalledWith('accessToken', 'access-token');
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
  });

  it('rejected → loading: false, error = payload', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      payload: 'Ошибка регистрации'
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка регистрации'
    });
  });
});
