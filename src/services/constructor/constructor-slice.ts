// src\services\constructor\constructor-slice.ts

import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorState {
  burger: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: ConstructorState = {
  burger: {
    bun: null,
    ingredients: []
  },

  isLoading: false,
  error: undefined
};

export const constructorSlice = createSlice({
  name: 'myconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burger.bun = action.payload;
        } else {
          state.burger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    swapIngredient: (state, action) => {
      console.log(action.payload.first, action.payload.second);
      const tmp = state.burger.ingredients[action.payload.first];
      state.burger.ingredients[action.payload.first] =
        state.burger.ingredients[action.payload.second];
      state.burger.ingredients[action.payload.second] = tmp;
    },

    removeIngredient(state, action: PayloadAction<string>) {
      state.burger.ingredients = state.burger.ingredients.filter(
        (ing) => ing._id !== action.payload
      );
    },

    clearConstructor(state) {
      state.burger.bun = null;
      state.burger.ingredients = [];
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state.burger
  }
});
export const { selectBurgerConstructor } = constructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  swapIngredient
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
