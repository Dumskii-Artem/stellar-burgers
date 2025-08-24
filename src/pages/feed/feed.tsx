import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectFeedOrders,
  selectOrdersLoading
} from '../../services/orders/orders-slice';
import { getFeedsThunk } from '../../services/orders/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  /** TODO: взять переменную из стора */
  const feedOrders: TOrder[] = useSelector(selectFeedOrders);
  const ordersLoading = useSelector(selectOrdersLoading);

  if (ordersLoading || !feedOrders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feedOrders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
