// src\_temp\IngredientsTest.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../services/store";
import { fetchIngredients } from "../services/reducers/ingredientsSlice";

export const IngredientsTest = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {items.map((ingredient) => (
        <li key={ingredient._id}>{ingredient.name}</li>
      ))}
    </ul>
  );
};
