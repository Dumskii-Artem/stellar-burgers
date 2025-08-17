// src\services\orders\actions.ts

import { getFeedsApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsThunk = createAsyncThunk(
  'feed/fetchInfo',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка загрузки ленты заказов');
    }
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  'feed/fetchByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(orderNumber);
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Ошибка получения заказа по номеру'
      );
    }
  }
);

export const postUserBurderThunk = createAsyncThunk(
  'order/postUserBurger',
  async (userBurgerIngredients: string[], { rejectWithValue }) => {
    try {
      console.log('userBurgerIngredients=', userBurgerIngredients);
      return await orderBurgerApi(userBurgerIngredients);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка отправки заказа');
    }
  }
);
