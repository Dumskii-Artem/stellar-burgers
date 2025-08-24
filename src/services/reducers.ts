// src\services\reducers.ts

import { combineSlices } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredients/ingredients-slice';
import { constructorSlice } from './constructor/constructor-slice';
import { userSlice } from './user/user-slice';
import { ordersSlice } from './orders/orders-slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  userSlice,
  ordersSlice
);
