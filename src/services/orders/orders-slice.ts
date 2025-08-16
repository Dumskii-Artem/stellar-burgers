// src\services\orders\orders-slice.ts

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsThunk, getOrderByNumberThunk } from './actions';
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
  reducers: {},
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
        state.orderByNumber = null; // сброс перед загрузкой
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload.orders[0];
        // ⚠️ проверь структуру ответа API
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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

// export const { addIngredient, removeIngredient, clearConstructor } =
//   constructorSlice.actions;

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

// import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
// import { TConstructorIngredient, TIngredient } from '@utils-types';

// interface ConstructorState {
//   bun: TConstructorIngredient | null;
//   ingredients: TConstructorIngredient[];
// }

// const initialState: ConstructorState = {
//   bun: null,
//   ingredients: [],
// };

// export const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     addIngredient: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
//         // state.ingredients.push(action.payload);
//         if (action.payload.type === 'bun') {
//           state.bun = action.payload;
//         } else {
//           state.ingredients.push(action.payload);
//         }
//       },
//       prepare: (ingredient: TIngredient) => {
//         const id = nanoid();
//         return { payload: { ...ingredient, id } };
//       }
//     },

//     // setBun(state, action: PayloadAction<TConstructorIngredient>) {
//     //   state.bun = action.payload;
//     // },

//     removeIngredient(state, action: PayloadAction<string>) {
//       state.ingredients = state.ingredients.filter(
//         (ing) => ing._id !== action.payload
//       );
//     },

//     // setBurgerConstructor: {
//     //   reducer: (state, action: PayloadAction<TConstructorIngredient>) => {

//     //   },
//     //   prepare: (ingredient: TIngredient) => {
//     //     const id = nanoid();
//     //     return { payload: { ...ingredient, id } };
//     //   }
//     // },

//     clearConstructor(state) {
//       state.bun = null;
//       state.ingredients = [];
//     },
//   },
// });

// // export const { setBun, addIngredient, removeIngredient, clearConstructor } =
// export const { addIngredient, removeIngredient, clearConstructor } =
//   constructorSlice.actions;

// export const constructorReducer = constructorSlice.reducer;
