// src\services\orders\__tests__\post-user-order.thunk.test.ts

import { getUserOrdersThunk, postUserBurderThunk } from '../actions';
import { ordersReducer } from '../orders-slice';
import { ordersTestInitialState } from '../../../constants/test-orders-state';
import { testOrder } from '../../../constants/test-orders';

describe('postUserBurderThunk', () => {
  it('pending → loading: true, orderRequest: true, error: null', () => {
    const action = { type: postUserBurderThunk.pending.type };
    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: true,
      orderRequest: true,
      error: null
    });
  });

  it('fulfilled → loading: false, orderRequest: false, записывает newOrder', () => {
    const payload = {
      order: testOrder,
      name: testOrder.name
    };

    const action = {
      type: postUserBurderThunk.fulfilled.type,
      payload
    };

    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      orderRequest: false,
      newOrder: payload
    });
  });

  it('rejected → loading: false, orderRequest: false, error = payload', () => {
    const action = {
      type: postUserBurderThunk.rejected.type,
      payload: 'Ошибка создания заказа'
    };

    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      orderRequest: false,
      error: 'Ошибка создания заказа'
    });
  });

  it('rejected → mock API error без message → сообщение по умолчанию', () => {
    const action = {
      type: getUserOrdersThunk.rejected.type,
      payload: 'Ошибка отправки заказа'
    };

    const state = ordersReducer(ordersTestInitialState, action);
    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      error: 'Ошибка отправки заказа'
    });
  });  
});
