import styles from './profile-page.module.css';
import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { patchUserInfoThunk, getUserInfoThunk } from '../../services/actions/user';
import { logoutUserThunk } from '../../services/actions/login.ts';

export function ProfilePage() {
  const dispatch = useDispatch();
  const currentName = useSelector(state => state.info.user.name);
  const currentEmail = useSelector(state => state.info.user.email);
  const login = JSON.parse(sessionStorage.getItem('login'));

  const [value, setValue] = React.useState({
    name: currentName,
    email: currentEmail,
    password: '',
  });

  const render = value.name !== currentName || value.email !== currentEmail || value.password.length > 0

  React.useEffect(() => {
    setValue({
      name: currentName,
      email: currentEmail,
      password: ''
    })
  }, [currentEmail, currentName])

  const inputRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }

  const saveInfo = (e) => {
    e.preventDefault();
    const { email, name, password } = value;
    dispatch(patchUserInfoThunk(email, name, password));
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
    onIconClick: (ref) => onIconClick(ref),
    errorText: 'Ошибка',
    size: 'default',
    extraClass: 'ml-1'
  }

  React.useEffect(() => {
    if (login) {
      dispatch(getUserInfoThunk());
    }
  }, [dispatch, login])

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
          изменять свои персональные данные</p>
      </nav>
      <section className={styles.section}>
        <form className={styles.section} onSubmit={saveInfo}>
          <div className='mt-6'>
            <Input type='text' placeholder={'Имя'} icon={'EditIcon'}
              onChange={e => setValue({ ...value, name: e.target.value })}
              value={value.name}
              {...options}
            />
          </div>
          <div className='mt-6'>
            <Input type='email' placeholder={'Логин'} icon={'EditIcon'}
              onChange={e => setValue({ ...value, email: e.target.value })}
              value={value.email}
              {...options} />
          </div>
          <div className='mt-6 mb-6'>
            <Input type='password' placeholder={'Пароль'} icon={'EditIcon'}
              onChange={e => setValue({ ...value, password: e.target.value })}
              value={value.password}
              {...options} />
          </div>
          {render ? <div className={styles.box}>
            <div className={`${styles.button} pl-6 pr-2`}><Button
              onClick={cancelChanges}
              htmlType='button'
              type='primary'
              size='medium'>Отменить
            </Button>
            </div>
            <div className={styles.button}><Button
              htmlType='submit'
              type='primary'
              size='medium'>Сохранить
            </Button>
            </div>
          </div> : null}
        </form>
      </section >
    </main>
  )
}


