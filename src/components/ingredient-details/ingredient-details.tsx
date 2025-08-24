import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/ingredients/ingredients-slice';

export const IngredientDetails: FC = () => {
  const id = String(Object.values(useParams()));

  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
