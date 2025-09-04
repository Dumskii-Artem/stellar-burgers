import { testIngredients } from '../../constants/test-ingredients';
import { getIngredientsThunk } from './actions';
import * as api from '@api';


describe('getIngredientsThunk', () => {
  it('успешный запрос должен вернуть данные', async () => {
    jest.spyOn(api, 'getIngredientsApi').mockResolvedValue(testIngredients);

    const dispatch = jest.fn();
    const thunk = getIngredientsThunk();

    await thunk(dispatch, () => ({}), undefined);

    // pending
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getIngredientsThunk.pending.type })
    );
    // fulfilled
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getIngredientsThunk.fulfilled.type,
        payload: testIngredients
      })
    );
  });

  it('ошибка должна вернуть rejectWithValue', async () => {
    jest.spyOn(api, 'getIngredientsApi').mockRejectedValue(new Error('API error'));

    const dispatch = jest.fn();
    const thunk = getIngredientsThunk();

    await thunk(dispatch, () => ({}), undefined);

    // pending
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getIngredientsThunk.pending.type })
    );
    // rejected
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getIngredientsThunk.rejected.type,
        payload: 'API error'
      })
    );
  });
});
