// src\components\burger-constructor\burger-constructor.tsx

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, RootState } from '@store';
import { selectBurgerConstructor } from '../../services/constructor/constructor-slice';
// import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  // const dispatch = useDispatch();

  // const onAddIngredient = (ingredient: TConstructorIngredient) => {
  //   dispatch(addIngredient(ingredient));
  // };

  // const constructorItems = useSelector((state: RootState) => state.constructor);
  // const orderRequest = useSelector((state: RootState) => state.order.request);
  // const orderModalData = useSelector((state: RootState) => state.order.modalData);
  const orderRequest = false;
  const orderModalData = null;

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: null,
    ingredients: []
  };
  // {
  //     price: 0
  //   },

  // const constructorItems = useSelector(selectBurgerConstructor);

  const onOrderClick = () => {
    // if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      // (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

    return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      // onAddIngredient={onAddIngredient}
    />
  );
};
