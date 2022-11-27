import React, { FC } from 'react';
import styles from './feed-details.module.css';
import { useSelector } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { includesIngregients, filterIngredients, getOrderDate, calculatePrice } from '../../utils/utils';

export const FeedDetails: FC = () => {
  const { orders: data } = useSelector(state => state.socket);
  const { ingredientsList: ingredients } = useSelector(state => state.ingredients);
  const params: { id: string } = useParams();
  const orderNumber = Number(params.id.split(':')[1]);
  const order = data.find(item => item.number === orderNumber)
  return (
    <main className={styles.card}>
      <div className={styles.header}>
        <p className={`${styles.id} text text_type_digits-default`}>#034535</p>
      </div>
      <p className={`${styles.name} text text_type_main-medium mt-6`}>Death Star Starship Main  бургер</p>
      <p className={`${styles.status} text text_type_main-small mt-3`}>{order?.status === 'done' ? `Выполнен` : `Готовится`}</p>
      <p className={`${styles.subtitle} text text_type_main-medium  mt-3`}>Cостав:</p>
      <ul className={styles.scroll}>
        {order && includesIngregients(ingredients, order?.ingredients).map(element => {
          return (<li className={styles.ingredient}
            key={element._id}>
            <img className={styles.image}
              src={element.image_mobile}
              alt={element.name} />
            <p className={`${styles.name} text text_type_main-small`}>{element.name}</p>
            <p className={`${styles.price} text text_type_digits-default`}>
              {filterIngredients(order.ingredients, ingredients)
                .filter(i => i._id === element._id)
                .length}x{element.price}</p>
            <CurrencyIcon type='primary' />
          </li>)
        })
        }
      </ul>
      <div className={styles.container}>
        {order && <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>{getOrderDate(order.createdAt)}</p>}
        {order && <p className={styles.total}>{calculatePrice(order.ingredients, ingredients)}<CurrencyIcon type='primary' /></p>}
      </div>
    </main>
  )
}
