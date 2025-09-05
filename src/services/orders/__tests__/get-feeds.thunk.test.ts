// src\services\orders\__tests__\get-feeds.thunk.test.ts

import { testOrder } from "../../../constants/test-orders";
import { ordersTestInitialState } from "../../../constants/test-orders-state";
import { getFeedsThunk } from "../actions";
import { ordersReducer } from "../orders-slice";

describe('getFeedsThunk', () => {
    it('pending → устанавливает loading: true и error: null', () => {
        const action = { type: getFeedsThunk.pending.type };
        const state = ordersReducer(ordersTestInitialState, action);

        expect(state).toEqual({
        ...ordersTestInitialState,
        loading: true,
        error: null
        });
    });

    it('fulfilled → записывает feed и отключает loading', () => {
        const actionPayload = {
        success: true,
        total: 1,
        totalToday: 1,
        orders: [testOrder]
        };

        const action = { type: getFeedsThunk.fulfilled.type, payload: actionPayload };
        const state = ordersReducer(ordersTestInitialState, action);

        expect(state).toEqual({
        ...ordersTestInitialState,
        loading: false,
        feed: actionPayload
        });
    });

    it('rejected → записывает ошибку и отключает loading', () => {
        const action = { type: getFeedsThunk.rejected.type, payload: 'Ошибка загрузки' };
        const state = ordersReducer(ordersTestInitialState, action);

        expect(state).toEqual({
        ...ordersTestInitialState,
        loading: false,
        error: 'Ошибка загрузки'
        });
    });

    it('rejected → mock API error → error message по умолчанию', () => {
        const error = new Error(); // без .message
        const action = {
            type: getFeedsThunk.rejected.type,
            payload: 'Ошибка загрузки ленты заказов'
        };

        const state = ordersReducer(ordersTestInitialState, action);
        expect(state).toEqual({
            ...ordersTestInitialState,
            loading: false,
            error: 'Ошибка загрузки ленты заказов'
        });
    });    
});
