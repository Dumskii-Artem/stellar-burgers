// src/services/constructor/constructor-slice.test.ts

import { emptyBurger } from '../../constants/test-burger';
import { testBun, testFilling, testSauce } from '../../constants/test-ingredients';
import { constructorReducer, addIngredient, removeIngredient, swapIngredient, clearBurger } from './constructor-slice';

describe('constructorSlice', () => {

  it('должен добавить булку в burger.bun', () => {
    const state = constructorReducer(undefined, addIngredient(testBun));

    expect(state.burger.bun).toMatchObject({
      _id: testBun._id,
      name: testBun.name,
      type: 'bun'
    });
  });

  it('должен добавить начинку в burger.ingredients', () => {
    const state = constructorReducer(undefined, addIngredient(testFilling));

    expect(state.burger.ingredients).toHaveLength(1);
    expect(state.burger.ingredients[0]).toMatchObject({
      _id: testFilling._id,
      name: testFilling.name,
      type: 'main'
    });
  });

  it('должен добавить соус в burger.ingredients', () => {
    const state = constructorReducer(undefined, addIngredient(testSauce));

    expect(state.burger.ingredients).toHaveLength(1);
    expect(state.burger.ingredients[0]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      type: 'sauce'
    });
  });

  it('удаление начинки не должно затрагивать соус', () => {
    // добавим начинку и соус
    let state = constructorReducer(undefined, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    expect(state.burger.ingredients).toHaveLength(2);

    // удаляем начинку
    state = constructorReducer(state, removeIngredient(testFilling._id));

    // соус остался
    expect(state.burger.ingredients).toHaveLength(1);
    expect(state.burger.ingredients[0]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      type: 'sauce'
    });
  }); 


  it('должен поменять два ингредиента местами по индексам', () => {
    // старт: две начинки в порядке [filling, sauce]
    let state = constructorReducer(undefined, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    // sanity-check
    expect(state.burger.ingredients.map(i => i._id)).toEqual([testFilling._id, testSauce._id]);

    // меняем местами 0 и 1
    state = constructorReducer(state, swapIngredient({ first: 0, second: 1 }));

    // ожидаем порядок [sauce, filling]
    expect(state.burger.ingredients.map(i => i._id)).toEqual([testSauce._id, testFilling._id]);
  });

  it('должен очищать булку и начинку при clearBurger', () => {
    let state = constructorReducer(undefined, addIngredient(testBun));
    state = constructorReducer(state, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    // sanity check перед очисткой
    expect(state.burger.bun).not.toBeNull();
    expect(state.burger.ingredients).toHaveLength(2);

    state = constructorReducer(state, clearBurger());

    // проверяем результат
    expect(state.burger).toEqual(emptyBurger);
  });   

});
