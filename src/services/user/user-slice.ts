// src\services\user\user-slice.ts
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserThunk, registerUserThunk, updateUserThunk } from './actions';
import { setCookie } from '../../utils/cookie';

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: true,

  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      // ========== REGISTRATION ==========
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ========== LOGIN ==========
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ========== UPDATE ==========
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    userSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  }
});

export const { userSelector, isAuthCheckedSelector } = userSlice.selectors;
// export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
