// src\services\orders\__tests__\get-user-orders.thunk.test.ts

import { getUserOrdersThunk } from '../actions';
import { ordersReducer } from '../orders-slice';
import { ordersTestInitialState } from '../../../constants/test-orders-state';
import { testOrder } from '../../../constants/test-orders';

describe('getUserOrdersThunk', () => {
  it('pending → loading: true, error: null', () => {
    const action = { type: getUserOrdersThunk.pending.type };
    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: true,
      error: null
    });
  });

  it('fulfilled → loading: false, записывает userOrders', () => {
    const action = {
      type: getUserOrdersThunk.fulfilled.type,
      payload: [testOrder]
    };

    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      userOrders: [testOrder]
    });
  });

  it('rejected → loading: false, error = payload', () => {
    const action = {
      type: getUserOrdersThunk.rejected.type,
      payload: 'Ошибка получения заказов пользователя'
    };

    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      error: 'Ошибка получения заказов пользователя'
    });
  });
});
