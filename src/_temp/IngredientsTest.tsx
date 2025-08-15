// src\_temp\IngredientsTest.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../services/store";
import { fetchIngredients } from "../services/ingredients/ingredients-slice";

export const IngredientsTest = () => {
  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient._id}>{ingredient.name}</li>
      ))}
    </ul>
  );
};
