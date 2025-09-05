// src\services\user\__tests__\login-user.thunk.test.ts


import { loginUserThunk } from '../actions';
import { userReducer, initialState } from '../user-slice';
import { testLoginResponse } from '../../../constants/test-user';
import { setCookie } from '../../../utils/cookie';

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
}));

describe('loginUserThunk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  it('pending → loading: true, error: null', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('fulfilled → сохраняет пользователя, токены, isAuthChecked: true', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: testLoginResponse,
    };

    const state = userReducer(initialState, action);

    expect(setCookie).toHaveBeenCalledWith(
      'accessToken',
      testLoginResponse.accessToken
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      testLoginResponse.refreshToken
    );

    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: testLoginResponse.user,
      isAuthChecked: true,
    });
  });

  it('rejected → loading: false, error = payload', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      payload: 'Ошибка входа',
    };

    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка входа',
    });
  });
});


// import { loginUserThunk } from '../actions';
// import { userReducer, initialState } from '../user-slice';
// import { setCookie } from '../../../utils/cookie';
// import { testLoginResponse } from '../../../constants/test-user';

// jest.mock('../../../utils/cookie', () => ({
//   setCookie: jest.fn()
// }));

// describe('loginUserThunk', () => {
//   beforeEach(() => {
//     global.localStorage = {
//       setItem: jest.fn(),
//       removeItem: jest.fn(),
//       getItem: jest.fn(),
//       clear: jest.fn()
//     } as any;

//     jest.clearAllMocks();
//   });

//   it('pending → loading: true, error: null', () => {
//     const action = { type: loginUserThunk.pending.type };
//     const state = userReducer(initialState, action);

//     expect(state).toEqual({
//       ...initialState,
//       loading: true,
//       error: null
//     });
//   });

//   it('fulfilled → сохраняет пользователя, токены, isAuthChecked: true', () => {
//     const action = {
//       type: loginUserThunk.fulfilled.type,
//       payload: testLoginResponse
//     };

//     const state = userReducer(initialState, action);

//     expect(state).toEqual({
//       ...initialState,
//       loading: false,
//       user: testLoginResponse.user,
//       isAuthChecked: true
//     });

//     expect(setCookie).toHaveBeenCalledWith('accessToken', testLoginResponse.accessToken);
//     expect(localStorage.setItem).toHaveBeenCalledWith(
//       'refreshToken',
//       testLoginResponse.refreshToken
//     );
//   });

//   it('rejected → loading: false, error = payload', () => {
//     const action = {
//       type: loginUserThunk.rejected.type,
//       payload: 'Ошибка входа'
//     };

//     const state = userReducer(initialState, action);

//     expect(state).toEqual({
//       ...initialState,
//       loading: false,
//       error: 'Ошибка входа'
//     });
//   });
// });
