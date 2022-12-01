import React, { FC } from 'react';
import styles from './profile-order-info.module.css';
import { useSelector, useDispatch } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { userWsConnectionStart } from '../../services/actions/user-orders-socket';
import {
  includesIngregients, filterIngredients,
  getOrderDate,
  calculatePrice
} from '../../utils/utils';
import { getCookie } from '../../utils/coockie';

export const ProfileOrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = getCookie('access');
    dispatch(userWsConnectionStart(token));
  }, []);

  const { orders: data } = useSelector(state => state.userOrders);
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients);
  const id = location.pathname.split('/')[3];
  const order = React.useMemo(() => {
    return data.find(item => item._id === id)
  }, [data, id])

  return (
    <main className={styles.card}>
      <div className={styles.header}>
        <p className={`${styles.id} text text_type_digits-default`}>#{order?.number}</p>
      </div>
      <p className={`${styles.name} text text_type_main-medium mt-10`}>{order?.name}</p>
      <p className={`${styles.status} text text_type_main-default mt-3`}>{order?.status === 'done' ? `Выполнен` : `Готовится`}</p>
      <p className={`${styles.subtitle} text text_type_main-medium  mt-15`}>Cостав:</p>
      <ul className={styles.scroll} >
        {order && includesIngregients(ingredients, order?.ingredients).map(element => {
          return (<li className={styles.ingredient}
            key={element._id}>
            <img className={styles.image}
              src={element.image_mobile}
              alt={element.name} />
            <p className={`${styles.name} text text_type_main-small ml-2`}>{element.name}</p>
            <p className={`${styles.price} text text_type_digits-default`}>
              {filterIngredients(order.ingredients, ingredients)
                .filter(i => i._id === element._id)
                .length}x{element.price} <CurrencyIcon type='primary' /></p>

          </li>)
        })
        }
      </ul>
      <div className={`${styles.container} mb-6`}>
        {order && <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>{getOrderDate(order.createdAt)}</p>}
        {order && <p className={`${styles.total} text text_type_digits-default ml-2`} >{calculatePrice(order.ingredients, ingredients)}<CurrencyIcon type='primary' /></p>}
      </div>
    </main>
  )
}
