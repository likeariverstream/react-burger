import React, { FC } from 'react';
import styles from './profile-orders.module.css';
import { useSelector, useDispatch } from '../../utils/hooks';
import { userWsConnectionStart } from '../../services/actions/user-orders-socket';
import { OrderCard } from '../../components/order-card/order-card';
import { nanoid } from 'nanoid';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch()
  const { orders: data } = useSelector(state => state.userOrders);
  React.useEffect(() => {
    dispatch(userWsConnectionStart())
  }, [dispatch])
  return (
    <main className={styles.main}>
      <div className={`${styles.scroll} mt-10`}>
        {data.map((element) => <OrderCard element={element} key={nanoid()} />)}
      </div>
    </main>
  )
}
