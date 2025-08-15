import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/ingredients/ingredients-slice';
import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getIngredientsThunck = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const id = String(Object.values(useParams()));

  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    dispatch(getIngredientsThunck());
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
