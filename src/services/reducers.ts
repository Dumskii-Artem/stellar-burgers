// src\services\reducers.ts

import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./ingredients/ingredients-slice";
import { constructorReducer } from "./constructor/constructor-slice";
import { userReducer } from "./user/user-slice";
import { ordersReducer } from "./orders/orders-slice";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    user: userReducer,
    orders: ordersReducer
});
