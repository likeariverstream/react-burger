import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useSelector } from '../../utils/hooks';
import styles from './feed-page.module.css';
import { Link } from 'react-router-dom';

export const FeedPage: FC = () => {
  const { constructorList: data } = useSelector(state => state.constructorList);
  const feedId = `3455`

  return (
    <main className={styles.main}>
      <section className={`${styles.feed} mt-15`}>
        <p className={`text text_type_main-large mt-10 ${styles.title}`} >Лента заказов</p>
        <ul className={styles.scroll}>
          <li className={styles.card}>
            <div className={styles.header}>
              <Link to={`/feed/:${feedId}`} className={styles.link}>
                <p className={`${styles.id} text text_type_digits-default`}>{`#${feedId}`}</p>
              </Link>
              <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
            </div>
            <p className={`${styles.name} text text_type_main-medium`}>Death Star Starship Main  бургер</p>
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
      <section className={`${styles.board} mt-15`}>
        <div className={styles.orders}>
          <div className={styles.done}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            <li className={`${styles.doneId} text text_type_digits-default`}>034533</li>
          </div>
          <div className={styles.work}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            <li className={`${styles.workId} text text_type_digits-default`}>034538</li>
          </div>
        </div>
        <li className={styles.completed}>
          <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
          <p className={`${styles.text} text text_type_digits-large`}>28 752</p>
        </li>
        <li className={styles.completed}>
          <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
          <p className={`${styles.text} text text_type_digits-large`}>138</p>
        </li>
      </section>
    </main>
  );
}
