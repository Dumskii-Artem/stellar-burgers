// src\components\burger-constructor\burger-constructor.tsx

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '@store';
import {
  selectNewOrder,
  selectOrderRequest,
  setNewOrder
} from '../../services/orders/orders-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { postUserBurderThunk } from '../../services/orders/actions';
import {
  clearBurger,
  selectBurgerConstructor
} from '../../services/constructor/constructor-slice';
import { selectUser } from '../../services/user/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);

  const userBurger = useSelector(selectBurgerConstructor);

  // ждем ответа сервера
  const orderRequest = useSelector(selectOrderRequest);
  // данные нового заказа
  const orderModalData = useSelector(selectNewOrder).order;

  const onOrderClick = () => {
    if (!userBurger.bun || orderRequest) {
      return;
    }

    if (!user) {
      return navigate('/login', {
        replace: true,
        state: {
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }
      });
    } else {
      const from = location.state?.from || { pathname: '/' };
      const backgroundLocation = location.state?.from?.background || null;

      const itemsId = [
        userBurger.bun._id,
        ...userBurger.ingredients.map((ingredient) => ingredient._id),
        userBurger.bun._id
      ];

      dispatch(postUserBurderThunk(itemsId)).then(() =>
        dispatch(clearBurger())
      );
      return navigate(from, {
        replace: true,
        state: { background: backgroundLocation }
      });
    }
  };

  const closeOrderModal = () => {
    dispatch(setNewOrder(false));
  };

  const price = useMemo(
    () =>
      (userBurger.bun ? userBurger.bun.price * 2 : 0) +
      userBurger.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [userBurger]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={userBurger}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
