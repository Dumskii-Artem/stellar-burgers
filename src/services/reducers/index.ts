// src\services\reducers\index.ts

import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./ingredientsSlice";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
});
