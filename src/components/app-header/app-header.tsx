import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeader: FC = () => {

  const login: boolean = JSON.parse(sessionStorage.getItem('login') as string);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <NavLink to='/'
            className={`${styles.constructor} ${styles.active}`}
          >
            <div className={styles.icon}>
              <BurgerIcon type="primary" />
            </div>
            <p className={`${styles.active}text text_type_main-default ml-2`}>
              Конструктор
            </p>
          </NavLink>
          <NavLink to='/'
            className={styles.order}
          >
            <div className={styles.icon}>
              <ListIcon type="secondary" />
            </div>
            <p className={`${styles.title} text text_type_main-default ml-2`}>
              Лента заказов
            </p>
          </NavLink>
        </div>
        <div className={styles.logo}><Logo /></div>
        <NavLink to={login ? { pathname: '/profile' } : { pathname: '/login' }}
          className={styles.personal}
        >
          <div className={styles.icon}>
            <ProfileIcon type="secondary" />
          </div>
          <p className={`${styles.title} text text_type_main-default ml-2`}>
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  )
}