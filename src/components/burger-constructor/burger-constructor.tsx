// src\components\burger-constructor\burger-constructor.tsx

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, RootState } from '@store';
import {
  selectNewOrder,
  selectOrderRequest
} from '../../services/orders/orders-slice';

export const BurgerConstructor: FC = () => {
  const burgerItems = useSelector(
    (state: RootState) => state.myconstructor.burger
  );

  // ждем ответа сервера
  const orderRequest = useSelector(selectOrderRequest);
  // данные нового заказа
  const orderModalData = useSelector(selectNewOrder).order;

  const onOrderClick = () => {
    if (!burgerItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (burgerItems.bun ? burgerItems.bun.price * 2 : 0) +
      burgerItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [burgerItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={burgerItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
