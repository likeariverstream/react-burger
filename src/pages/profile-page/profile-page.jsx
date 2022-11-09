import styles from './profile-page.module.css';
import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { patchUserInfoThunk } from '../../services//actions/user';
import { logoutUserThunk } from '../../services/actions/login';

// это функция компонента страницы профиля
// возвращает разметку с инпутами и кнопкой

export function ProfilePage() {
  const dispatch = useDispatch();
  const currentName = useSelector(state => state.info.user.name);
  const currentEmail = useSelector(state => state.info.user.email);

  const [value, setValue] = React.useState({
    name: currentName,
    email: currentEmail,
    password: '',
    render: false
  });

  const inputRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)

  }

  const saveInfo = () => {
    dispatch(patchUserInfoThunk(value.email, value.name, value.password));
    setValue({
      name: currentName,
      email: currentEmail,
      password: ''
    })
  }

  const cancelChanges = () => {
    setValue({
      name: '',
      email: '',
      password: ''
    })
  }

  const logoutUser = React.useCallback(() => {
    dispatch(logoutUserThunk());
    sessionStorage
      .setItem('login', JSON.stringify(false));
  }, [dispatch])

  const options = {
    name: 'name',
    error: false,
    ref: inputRef,
    onIconClick: () => onIconClick(),
    errorText: 'Ошибка',
    size: 'default',
    extraClass: 'ml-1'
  }

  return (
    <main className={styles.main}>
      <nav className={`${styles.nav} mr-15`}>
        <NavLink
          to={{ pathname: '/profile' }} exact={true}
          className={styles.tab}
          activeClassName={styles.active}>
          <h3 className='text text_type_main-medium mt-4 mb-8'>Профиль</h3>
        </NavLink>
        <NavLink
          to={{ pathname: '/profile/orders' }}
          className={styles.tab}
          activeClassName={styles.active}>
          <h3 className='text text_type_main-medium mb-8'>История заказов</h3>
        </NavLink>
        <NavLink
          to={{ pathname: '/login' }}
          className={styles.tab}
          activeClassName={styles.active}>
          <h3 onClick={logoutUser} className='text text_type_main-medium mb-4'>Выход</h3>

        </NavLink>
        <p className={`${styles.text} mt-20`}>В этом разделе вы можете
          изменить свои персональные данные</p>
      </nav>
      <section className={styles.section}>
        <div className='mt-6'>
          <Input type='text' placeholder={'Имя'} icon={'EditIcon'}
            onChange={e => setValue({ ...value, name: e.target.value, render: true })}
            value={value.name}
            {...options}
          />
        </div>
        <div className='mt-6'>
          <Input type='email' placeholder={'Логин'} icon={'EditIcon'}
            onChange={e => setValue({ ...value, email: e.target.value, render: true })}
            value={value.email}
            {...options} />
        </div>
        <div className='mt-6 mb-6'>
          <Input type='password' placeholder={'Пароль'} icon={'EditIcon'}
            onChange={e => setValue({ ...value, password: e.target.value, render: true })}
            value={value.password}
            {...options} />
        </div>
        {value.render ? <div className={styles.box}>
          <div className={styles.button}><Button
            onClick={cancelChanges}
            htmlType='submit'
            type='primary'
            size='medium'>Отмена
          </Button></div>
          <div className={styles.button}><Button
            onClick={saveInfo}
            htmlType='submit'
            type='primary'
            size='medium'>Сохранить
          </Button></div>
        </div> : null}
      </section >
    </main>
  )
}


