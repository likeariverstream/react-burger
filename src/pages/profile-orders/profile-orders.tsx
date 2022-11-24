import React, { FC } from 'react';
import styles from './profile-orders.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
export const ProfileOrders: FC = () => {
  const feedId = '4242'
  const data = useSelector(state => state.constructorList.constructorList)
  return (
    <section className={`${styles.feed} mt-15`}>
      <ul className={styles.scroll}>
        <li className={styles.card}>
          <div className={styles.header}>
            <Link to={`/feed/:${feedId}`} className={styles.link}>
              <p className={`${styles.id} text text_type_digits-default`}>{`#${feedId}`}</p>
            </Link>
            <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
          </div>
          <p className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main  бургер</p>
          <p className={`${styles.status} text text_type_main-small mt-3`}>Выполнен</p>
          <div className={styles.count}>
            <div className={styles.ingredients}>
              {
                data.map(element => {
                  return <div className={styles.icon} key={element.id}>
                    <img className={styles.image} src={element.image_mobile} alt={element.name} />
                  </div>
                })
              }
              <div className={styles.container}>
                <p className={`${styles.price} text text_type_digits-default`}>480</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  )
}
