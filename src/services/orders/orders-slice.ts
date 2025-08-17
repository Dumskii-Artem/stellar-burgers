// src\services\orders\orders-slice.ts

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getFeedsThunk,
  getOrderByNumberThunk,
  postUserBurderThunk
} from './actions';
import { TFeedsResponse } from '@api';

export interface OrderState {
  feed: TFeedsResponse;
  userOrders: TOrder[];
  orderByNumber: TOrder | null;
  newOrder: {
    order: TOrder | null;
    name: string;
  };
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  feed: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
  },
  userOrders: [],
  orderByNumber: null,
  newOrder: {
    order: null,
    name: ''
  },
  orderRequest: false,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setNewOrder: (state, action) => {
      state.orderRequest = action.payload;
      state.newOrder.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ====== FEED ======
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ====== ORDER BY NUMBER ======
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderByNumber = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ====== NEW USER ORDER ======
      .addCase(postUserBurderThunk.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(postUserBurderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.newOrder = {
          order: action.payload.order,
          name: action.payload.name
        };
      })
      .addCase(postUserBurderThunk.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.payload as string;
        console.log(action.payload);
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.feed.orders,
    selectOrdersLoading: (state) => state.loading,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectFeed: (state) => state.feed,
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.orderRequest
    // selectUserOrders: (state) => state.userOrders
  }
});

export const {
  selectFeedOrders,
  selectOrdersLoading,
  selectOrderByNumber,
  selectFeed,
  selectNewOrder,
  selectOrderRequest
  //   selectUserOrders
} = ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
export const { setNewOrder } = ordersSlice.actions;
