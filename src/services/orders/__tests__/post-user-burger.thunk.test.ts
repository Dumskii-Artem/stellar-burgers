// src\services\orders\__tests__\post-user-burger.thunk.test.ts

import { postUserBurderThunk } from '../actions';
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
    const action = {
      type: postUserBurderThunk.fulfilled.type,
      payload: {
        order: testOrder,
        name: 'Test Order Name'
      }
    };

    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      orderRequest: false,
      newOrder: {
        order: testOrder,
        name: 'Test Order Name'
      }
    });
  });

  it('rejected → loading: false, orderRequest: false, error = payload', () => {
    const action = {
      type: postUserBurderThunk.rejected.type,
      payload: 'Ошибка при оформлении заказа'
    };

    const state = ordersReducer(ordersTestInitialState, action);

    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      orderRequest: false,
      error: 'Ошибка при оформлении заказа'
    });
  });

  it('rejected → mock API error без message → сообщение по умолчанию', () => {
    const action = {
      type: postUserBurderThunk.rejected.type,
      payload: 'Ошибка отправки заказа'
    };

    const state = ordersReducer(ordersTestInitialState, action);
    expect(state).toEqual({
      ...ordersTestInitialState,
      loading: false,
      orderRequest: false,
      error: 'Ошибка отправки заказа'
    });
  });  
});
