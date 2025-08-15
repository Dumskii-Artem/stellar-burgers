// src\services\orders\orders-slice.ts

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  feed: {
    total: number;
    totalToday: number;
    orders: TOrder[];
    isLoading: boolean;
    error: string | undefined;
  };
  userOrders: {
    orders: TOrder[];
    isLoading: boolean;
    error: string | undefined;
  };
  orderByNumber: {
    order: TOrder | null;
    isLoading: boolean;
    error: string | undefined;
  };
  newOrder: {
    order: TOrder | null;
    name: string;
  };
  orderRequest: boolean;
}

const initialState: OrderState = {
  feed: {
    total: 0,
    totalToday: 0,
    orders: [],
    isLoading: false,
    error: undefined
  },
  userOrders: {
    orders: [],
    isLoading: false,
    error: undefined
  },
  orderByNumber: {
    order: null,
    isLoading: false,
    error: undefined
  },
  newOrder: {
    order: null,
    name: ''
  },
  orderRequest: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    // selectOrders: (state) => state.orders,
    // selectOrderByNumber: (state) => state.orderByNumber,
    // selectFeed: (state) => state.feed,
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.orderRequest
    // selectUserOrders: (state) => state.userOrders
  }
});

// export const { addIngredient, removeIngredient, clearConstructor } =
//   constructorSlice.actions;

export const {
  //   selectOrders,
  //   selectOrderByNumber,
  //   selectFeed,
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
