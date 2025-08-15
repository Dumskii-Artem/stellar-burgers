import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@store';
import { swapIngredient } from '../../services/constructor/constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(swapIngredient({ first: index, second: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(swapIngredient({ first: index, second: index - 1 }));
    };

    const handleClose = () => {};

    // const handleMoveUp = () => {
    //   dispatch(moveIngredient({ from: index, to: index -= 1 }));
    // };

    // const handleClose = () => {
    //   dispatch(removeIngredient(ingredient.id));
    // };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
