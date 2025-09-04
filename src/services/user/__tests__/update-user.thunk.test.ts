import { updateUserThunk } from '../actions';
import { userReducer, initialState } from '../user-slice';
import { testLoginResponse } from '../../../constants/test-user';

describe('updateUserThunk', () => {
  it('pending → loading: true, error: null', () => {
    const action = { type: updateUserThunk.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('fulfilled → loading: false, записывает user', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: testLoginResponse
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: testLoginResponse.user
    });
  });

  it('rejected → loading: false, error = payload', () => {
    const error = 'Ошибка обновления пользователя';
    const action = {
      type: updateUserThunk.rejected.type,
      payload: error
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error
    });
  });
});
