import React, { FC } from 'react';
import styles from './profile-order-card.module.css'
import { useHistory, useLocation } from 'react-router-dom';
import {
  getOrderDate,
  filterIngredients,
  calculatePrice
} from '../../utils/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from '../../utils/types';
import { useSelector } from '../../utils/hooks';
import { nanoid } from 'nanoid';

type TOrderCard = {
  element: TOrder
}

export const ProfileOrderCard: FC<TOrderCard> = ({ element }) => {
  const location = useLocation();
  const history = useHistory();
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients);
  const handleProfileOrderCard = () => {
    const { number } = element;
    const url = `/profile/orders/:${number}`;
    history.push({
      pathname: url,
      state: {
        background: location,
        element: element
      }
    })
  }
  return (
      <li className={`${styles.card} ${styles.link}`} onClick={handleProfileOrderCard}>
        <div className={styles.header}>
          <p className={`${styles.id} text text_type_digits-default`}>#{element.number}</p>
          <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>
            {getOrderDate(element.createdAt)}</p>
        </div>
        <div className={styles.caption}>
          <p className={`${styles.name} text text_type_main-medium`}>{element.name}</p>
          <p className={`${styles.status} text text_type_main-small ${element.status === 'done' ? styles.done : null}`}>{element.status === 'done' ? `Выполнен` : `Готовится`}</p>
        </div>
        <div className={styles.ingredients}>
          {filterIngredients(element.ingredients, ingredients).map((item, index) => {
            return <div className={styles.icon} key={nanoid()}>
              <img className={styles.image} src={item.image_mobile} alt={item.name}
                style={{
                  zIndex: index,
                  transform: `translateX(${- index * 18}px)`
                }} />
            </div>
          })}
          <div className={styles.container}>
            <p className={`${styles.price} text text_type_digits-default`}>
              {calculatePrice(element.ingredients, ingredients)}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </li>
  )
}
