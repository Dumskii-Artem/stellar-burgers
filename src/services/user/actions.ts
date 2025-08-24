// src\services\user\actions.ts
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import { setUser } from './user-slice';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (newUserData: TRegisterData, { rejectWithValue }) => {
    try {
      return await registerUserApi(newUserData);
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка регистрации нового пользователя'
      );
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      return await loginUserApi(loginData);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка входа (логина)');
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (userPartialData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return await updateUserApi(userPartialData);
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка изменения данных пользователя'
      );
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка выхода из системы');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi().then((user) => dispatch(setUser(user.user)));
    }
  }
);

export const setIsAuthChecked = createAction<boolean, 'user/setIsAuthChecked'>(
  'user/setIsAuthChecked'
);
