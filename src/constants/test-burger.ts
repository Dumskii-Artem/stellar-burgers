// src/constants/test-burger.ts

import { testBun, testFilling, testSauce } from './test-ingredients';
import { TConstructorIngredient } from '@utils-types';

export const testBurger = {
  bun: { ...testBun, id: 'bun-test-id' },
  ingredients: [
    { ...testFilling, id: 'filling-test-id' },
    { ...testSauce, id: 'sauce-test-id' }
  ] as TConstructorIngredient[]
};

export const emptyBurger = {
  bun: null,
  ingredients: [] as TConstructorIngredient[]
};
