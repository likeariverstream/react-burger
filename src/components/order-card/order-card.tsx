import React, { FC } from 'react';
import styles from './order-card.module.css'
import { Link } from 'react-router-dom';
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

export const OrderCard: FC<TOrderCard> = ({ element }) => {
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients);

  return (
    <li className={styles.card}>
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
    </li>
  )
}
