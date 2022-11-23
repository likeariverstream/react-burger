import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import styles from './feed-page.module.css'

export const FeedPage: FC = () => {
  const { constructorList: data } = useSelector(state => state.constructorList);
  return (
    <main className={styles.main}>
      <section className={styles.feed}>
        <p className={`${styles.title}text text_type_main-large mt-10 mb-5`} >Лента заказов</p>
        <div className={styles.scroll}>
          <li className={styles.card}>
            <div className={styles.header}>
              <p className={styles.id}>#034535</p>
              <p className={styles.timestamp}>Сегодня, 16:20 i-GMT+3</p>
            </div>
            <p className={styles.name}>Death Star Starship Main бургер</p>
            <div className={styles.ingredients}>
              {
                data.map(element => {
                  return <div className={styles.icon}>
                    <img className={styles.image} src={element.image_mobile} alt={element.name} />
                  </div>
                })
              }
              <p className={styles.price}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        </div>
      </section>
      <section className={styles.board}>
        <div className={styles.orders}>
          <div className={styles.done}>
            <p>Готовы:</p>
            <li className={styles.doneId}>034533</li>
          </div>
          <div className={styles.work}>
            <p>В работе:</p>
            <li>034538</li>
          </div>
        </div>
        <li className={styles.completed}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styles.count} text text_type_digits-large`}>28 752</p>
        </li>
        <li className={styles.completed}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styles.count} text text_type_digits-large`}>138</p>
        </li>
      </section>
    </main>
  );
}
