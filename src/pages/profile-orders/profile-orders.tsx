import React, { FC } from 'react';
import { ProfileNav } from '../../components/profile-nav/profile-nav';
import { ProfileOrderCard } from '../../components/profile-order-card/profile-order-card';
import { useSelector, useDispatch } from '../../utils/hooks';
import styles from './profile-orders.module.css';
import {
  userWsConnectionStart,
  userWsConnectionClosed
} from '../../services/actions/user-orders-socket';
import { getCookie } from '../../utils/coockie';
import { profileOrdersUrl } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const token = getCookie('access');
    dispatch(userWsConnectionStart(token));
  }, [])
  React.useEffect(() => {
    if (location.pathname !== profileOrdersUrl)
    dispatch(userWsConnectionClosed())
  }, [location, dispatch])
  const { orders: data } = useSelector(state => state.userOrders);
  console.log(data)
  return (
    data && <main className={styles.main}>
      <ProfileNav />
      <section className={styles.section}>
        <div className={`${styles.scroll} mt-10`}>
          {data.map((element) => <ProfileOrderCard element={element} key={element._id} />)}
        </div>
      </section>
    </main>
  )
}
