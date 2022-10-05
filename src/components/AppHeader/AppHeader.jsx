import React from 'react';
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {

  return (
    <header className={styles.header}>
    <nav className={styles.nav}>
    <div className={styles.constructor} >
      <BurgerIcon type="primary" className={styles.icon}/>
        <p className="text text_type_main-medium ml-2">
          Конструктор
        </p>
    </div>
    <div className={styles.order}>
      <ListIcon type='primary' className={styles.icon}/>
      <p className="text text_type_main-medium ml-2">
        Лента заказов
      </p>
    </div>
      <Logo />
      <div className={styles.personal}>
        <ProfileIcon type="primary" className={styles.icon}/>
        <p className="text text_type_main-medium ml-3">
        Личный кабинет
      </p>
      </div>
    </nav>
      
    </header>
  )
}

export default AppHeader;