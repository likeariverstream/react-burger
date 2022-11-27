import React, { FC } from 'react';
import styles from './profile-orders.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { userWsConnectionStart } from '../../services/actions/user-orders-socket';
import { filterIngredients, calculatePrice, getOrderDate } from '../../utils/utils';
import { nanoid } from 'nanoid';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch()
  const { orders: data } = useSelector(state => state.userOrders);
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients);
  React.useEffect(() => {
    dispatch(userWsConnectionStart())
  }, [dispatch])
  return (
    <main className={styles.main}>
      <div className={`${styles.scroll} mt-10`}>
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
    </main>
  )
}
