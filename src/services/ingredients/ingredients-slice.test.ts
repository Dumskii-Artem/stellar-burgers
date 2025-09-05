// src/services/ingredients/ingredients-slice.test.ts

import { ingredientsReducer } from './ingredients-slice';
import { getIngredientsThunk } from './actions';
import { testIngredients } from '../../constants/test-ingredients'

const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('ingredientsSlice', () => {
  it('pending: должен установить loading=true и error=null', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('fulfilled: должен установить loading=false и обновить ингредиенты', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: testIngredients
    };
    const result = ingredientsReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loading: false,
      ingredients: testIngredients
    });
  });

  it('rejected: должен установить loading=false и записать ошибку', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: getIngredientsThunk.rejected.type,
      payload: errorMessage
    };
    const result = ingredientsReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });
});
