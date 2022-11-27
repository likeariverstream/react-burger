import React, { FC } from 'react';
import styles from './feed-page.module.css';
import { useSelector } from '../../utils/hooks';
import { useDispatch } from '../../utils/hooks';
import { wsConnectionStart } from '../../services/actions/socket';
import { OrderCard } from '../../components/order-card/order-card';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders: data } = useSelector(state => state.socket);
  const { total } = useSelector(state => state.socket);
  const { totalToday } = useSelector(state => state.socket);
  
  React.useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch])

  return (
    <main className={styles.main}>
      <section className={`${styles.feed} mt-15`}>
        <p className={`text text_type_main-large mt-10 ${styles.title}`} >Лента заказов</p>
        <div className={styles.scroll}>
          {data.map((element) => {
            return <OrderCard element={element} key={element._id} />
          })}
        </div>
      </section>
      <section className={`${styles.board} mt-15`}>
        <div className={styles.orders}>
          <ul className={styles.done}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            {data.map((item, index) => {
              if (item.status === 'done' && index < 10)
                return <li key={item._id} className={`${styles.doneId} text text_type_digits-default`}>{item.number}</li>
            })
            }
          </ul>
          <div className={styles.work}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            {data.map((item, index) => {
              if (item.status !== 'done' && index < 10)
                return <li key={item._id} className={`${styles.workId} text text_type_digits-default`}>{item.number}</li>
            })
            }
          </div>
        </div>
        <li className={styles.completed}>
          <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
          <p className={`${styles.text} text text_type_digits-large`}>{total}</p>
        </li>
        <li className={styles.completed}>
          <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
          <p className={`${styles.text} text text_type_digits-large`}>{totalToday}</p>
        </li>
      </section>
    </main >
  );
}
