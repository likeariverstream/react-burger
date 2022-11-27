import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import styles from './feed-page.module.css';
import { Link } from 'react-router-dom';
import { filterIngredients, calculatePrice, getOrderDate } from '../../utils/utils';
import { useDispatch } from '../../utils/hooks';
import { wsConnectionStart } from '../../services/actions/socket';
import { nanoid } from 'nanoid';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders: data } = useSelector(state => state.socket);
  const { total } = useSelector(state => state.socket);
  const { totalToday } = useSelector(state => state.socket);
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients);
  React.useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch])

  return (
    <main className={styles.main}>
      <section className={`${styles.feed} mt-15`}>
        <p className={`text text_type_main-large mt-10 ${styles.title}`} >Лента заказов</p>
        <div className={styles.scroll}>
          {data.map((element) => <li className={styles.card} key={element._id}>
            <div className={styles.header}>
              <Link to={`/feed/:${element.number}`} className={styles.link}>
                <p className={`${styles.id} text text_type_digits-default`}>#{element.number}</p>
              </Link>

              <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>
                {getOrderDate(element.createdAt)}</p>
            </div>
            <p className={`${styles.name} text text_type_main-medium`}>{element.name}</p>
            <div className={styles.count}>
              <div className={styles.ingredients}>
                {filterIngredients(element.ingredients, ingredients).map((item) => {
                  return <div className={styles.icon} key={nanoid()}>
                    <img className={styles.image} src={item.image_mobile} alt={item.name} />
                  </div>
                })}
                <div className={styles.container}>
                  <p className={`${styles.price} text text_type_digits-default`}>
                    {calculatePrice(element.ingredients, ingredients)}</p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            </div>
          </li>)}
        </div>
      </section>
      <section className={`${styles.board} mt-15`}>
        <div className={styles.orders}>
          <ul className={styles.done}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            {data.map((item, index) => {
              if (item.status === 'done' && index < 10)
                return <li className={`${styles.doneId} text text_type_digits-default`}>{item.number}</li>
            })
            }
          </ul>
          <div className={styles.work}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            {data.map((item, index) => {
              if (item.status !== 'done' && index < 10)
                return <li className={`${styles.workId} text text_type_digits-default`}>{item.number}</li>
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
