import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import { routes } from '../../utils/constants';

export const AppHeader: FC = () => {
  const { isLoggedIn: login } = useSelector(state => state.login);
  const location = useLocation();
  const personalIsActive = location.pathname.includes(routes.profile)
    || location.pathname.includes(routes.login)
    || location.pathname.includes(routes.register)
    || location.pathname.includes(routes.resetPassword)
    || location.pathname.includes(routes.forgotPassword);
  const feedIsActive = location.pathname.includes(routes.feed);
  const constructorIsActive = location.pathname === routes.home;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <NavLink to={routes.home}
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
          <NavLink to={routes.feed}
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
        <Link to={routes.home}>
          <div className={styles.logo} ><Logo />
          </div></Link>
        <NavLink to={login ? { pathname: routes.profile} : { pathname: routes.login }}
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
