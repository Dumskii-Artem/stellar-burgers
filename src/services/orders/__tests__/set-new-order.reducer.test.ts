// src\services\orders\__tests__\set-new-order.reducer.test.ts

import { ordersReducer, setNewOrder } from '../orders-slice';
import { ordersTestInitialState } from '../../../constants/test-orders-state';
import { testOrder } from '../../../constants/test-orders';

describe('setNewOrder reducer', () => {
  it('устанавливает orderRequest = true и сбрасывает newOrder.order', () => {
    const action = setNewOrder(true);

    const state = ordersReducer(
      {
        ...ordersTestInitialState,
        newOrder: {
          order: testOrder,
          name: testOrder.name
        }
      },
      action
    );

    expect(state).toEqual({
      ...ordersTestInitialState,
      orderRequest: true,
      newOrder: {
        order: null,
        name: testOrder.name
      }
    });
  });

  it('устанавливает orderRequest = false и сбрасывает newOrder.order', () => {
    const action = setNewOrder(false);

    const state = ordersReducer(
      {
        ...ordersTestInitialState,
        newOrder: {
          order: testOrder,
          name: testOrder.name
        }
      },
      action
    );

    expect(state).toEqual({
      ...ordersTestInitialState,
      orderRequest: false,
      newOrder: {
        order: null,
        name: testOrder.name
      }
    });
  });
});
