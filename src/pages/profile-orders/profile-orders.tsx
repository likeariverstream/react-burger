import React, { FC } from 'react';
import styles from './profile-orders.module.css';
import { useSelector } from '../../utils/hooks';
import { ProfileOrderCard } from '../../components/profile-order-card/profile-order-card';
import { nanoid } from 'nanoid';
import { ProfileNav } from '../../components/profile-nav/profile-nav';

export const ProfileOrders: FC = () => {

  const { orders: data } = useSelector(state => state.userOrders);
  return (
    data && <main className={styles.main}>
      <ProfileNav />
      <section className={styles.section}>
        <div className={`${styles.scroll} mt-10`}>
          {data.map((element) => <ProfileOrderCard element={element} key={nanoid()} />)}
        </div>
      </section>
    </main>
  )
}
