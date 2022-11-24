import React, { FC } from 'react';
import styles from './profile-order-info.module.css';
import { useSelector } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ProfileOrderInfo: FC = () => {
  const { constructorList: data } = useSelector(state => state.constructorList);
  const orderId = `2222`
  return (
    <main className={styles.card}>
      <div className={styles.header}>
        <Link to={`/profile/orders/:${orderId}`}><p className={`${styles.id} text text_type_digits-default`}>#034535</p></Link>
      </div>
      <p className={`${styles.name} text text_type_main-medium mt-6`}>Death Star Starship Main  бургер</p>
      <p className={`${styles.status} text text_type_main-small mt-3`}>Выполнен</p>
      <p className={`${styles.subtitle} text text_type_main-medium  mt-3`}>Cостав:</p>
      <ul className={styles.scroll}>
        {data.map(element => {
          return (<li className={styles.ingredient}
            key={element.id}>
            <img className={styles.image}
              src={element.image_mobile}
              alt={element.name} />
            <p className={`${styles.name} text text_type_main-small`}>{element.name}</p>
            <p className={`${styles.price} text text_type_digits-default`}>2x{element.price}</p>
            <CurrencyIcon type='primary' />
          </li>)
        })
        }
      </ul>
      <div className={styles.container}>
        <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
        <p className={styles.total}>510<CurrencyIcon type='primary' /></p>
      </div>
    </main>
  )
}
