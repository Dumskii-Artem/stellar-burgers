// src\services\reducers\ingredientsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsApi } from "../../utils/burger-api";
import { TIngredient } from "../../utils/types";

type IngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients; // уже массив TIngredient[]
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка загрузки ингредиентов");
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
