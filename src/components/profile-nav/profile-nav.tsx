import styles from './profile-nav.module.css';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';
import { logoutUserThunk } from '../../services/actions/login';
import { routes } from '../../utils/constants';

export const ProfileNav: FC = () => {
  const dispatch = useDispatch();
  const logoutUser = React.useCallback(() => {
    dispatch(logoutUserThunk());
  }, [dispatch])

  return (
    <nav className={`${styles.nav} mr-15`}>
      <NavLink
        to={{ pathname: routes.profile }} exact={true}
        className={styles.tab}
        activeClassName={styles.active}>
        <h3 className='text text_type_main-medium mt-4 mb-8'>Профиль</h3>
      </NavLink>
      <NavLink
        to={{
          pathname: routes.profileOrders,
        }}
        className={styles.tab}
        activeClassName={styles.active}>
        <h3 className='text text_type_main-medium mb-8'>История заказов</h3>
      </NavLink>
      <NavLink
        to={{ pathname: routes.login }}
        className={styles.tab}
        activeClassName={styles.active}>
        <h3 onClick={logoutUser} className='text text_type_main-medium mb-4'>Выход</h3>
      </NavLink>
      <p className={`${styles.text} mt-20`}>В этом разделе вы можете
        изменять свои персональные данные</p>
    </nav>
  )
}
