import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

export const AppHeader: FC = () => {
  const { isLoggedIn: login } = useSelector(state => state.login);
  const location = useLocation();
  const personalIsActive = location.pathname.includes('/profile')
    || location.pathname.includes('/login')
    || location.pathname.includes('/register')
    || location.pathname.includes('password');
  const feedIsActive = location.pathname.includes('/feed');
  const constructorIsActive = location.pathname === '/';

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <NavLink to='/'
            className={`${styles.constructor} ${styles.active}`}
          >
            <div className={styles.icon}>
              {constructorIsActive
                ? <BurgerIcon type="primary" />
                : <BurgerIcon type="secondary" />}
            </div>
            <p className={`${constructorIsActive
              ? styles.active
              : styles.title} text text_type_main-default ml-2`}>
              Конструктор
            </p>
          </NavLink>
          <NavLink to='/feed'
            className={styles.order}
          >
            <div className={styles.icon}>
              {feedIsActive
                ? <ListIcon type="primary" />
                : <ListIcon type="secondary" />}
            </div>
            <p className={`${feedIsActive
              ? styles.active
              : styles.title} text text_type_main-default ml-2`}>
              Лента заказов
            </p>
          </NavLink>
        </div>
        <Link to='/'>
          <div className={styles.logo} ><Logo />
          </div></Link>
        <NavLink to={login ? { pathname: '/profile' } : { pathname: '/login' }}
          className={styles.profile}
        >
          <div className={styles.icon}>
            {personalIsActive
              ? <ProfileIcon type="primary" />
              : <ProfileIcon type="secondary" />}
          </div>
          <p className={`${personalIsActive ?
            styles.active
            : styles.title} text text_type_main-default ml-2`}>
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  )
}
