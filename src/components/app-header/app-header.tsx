import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

export const AppHeader: FC = () => {
  const { isLoggedIn: login } = useSelector(state => state.login)

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
          <NavLink to='/feed'
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
        <div className={styles.logo} ><Logo /></div>
        <NavLink to={login ? { pathname: '/profile' } : { pathname: '/login' }}
          className={styles.profile}
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
