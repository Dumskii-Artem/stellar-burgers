// src\services\user\actions.ts
import {
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
