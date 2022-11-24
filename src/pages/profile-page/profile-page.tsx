import styles from './profile-page.module.css';
import React, { FC, FormEventHandler } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { patchUserInfoThunk, getUserInfoThunk } from '../../services/actions/user';
import { logoutUserThunk } from '../../services/actions/login';
import { useForm } from '../../utils/hooks';
import { getCookie } from '../../utils/coockie';
import { ProfileOrders } from '../profile-orders/profile-orders';

export const ProfilePage: FC = () => {
  const login: boolean = !!getCookie('access')
  console.log(login)
  const dispatch = useDispatch();
  const currentName = useSelector(state => state.info.user.name);
  const currentEmail = useSelector(state => state.info.user.email);

  const { values, setValues } = useForm({
    name: currentName,
    email: currentEmail,
    password: ''
  });

  const {
    name,
    email,
    password
  } = values

  const render: boolean = name !== currentName || email !== currentEmail || password.length > 0

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);

  }

  const saveInfo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(patchUserInfoThunk(email, name, password));
    setValues({
      name: currentName,
      email: currentEmail,
      password: ''
    })
  }

  const cancelChanges = () => {
    setValues({
      name: '',
      email: '',
      password: ''
    })
  }

  const logoutUser = React.useCallback(() => {
    dispatch(logoutUserThunk());

  }, [dispatch])

  const options = {
    name: 'name',
    error: false,
    ref: inputRef,
    errorText: 'Ошибка',
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
      <Route path='/profile/orders/'>
        <ProfileOrders />
      </Route>
      <Route path='/profile' exact>
      <section className={styles.section}>
        <form className={styles.section} onSubmit={saveInfo}>
          <div className='mt-6'>
            <Input type='text'
              placeholder={'Имя'}
              icon={'EditIcon'}
              onIconClick={() => onIconClick()}
              onChange={e => setValues({ ...values, name: e.target.value })}
              value={name}
              {...options}
            />
          </div>
          <div className='mt-6'>
            <Input type='email'
              placeholder={'Логин'}
              icon={'EditIcon'}
              onIconClick={() => onIconClick()}
              onChange={e => setValues({ ...values, email: e.target.value })}
              value={email}
              {...options} />
          </div>
          <div className='mt-6 mb-6'>
            <Input type='password'
              placeholder={'Пароль'}
              icon={'EditIcon'}
              onIconClick={() => onIconClick()}
              onChange={e => setValues({ ...values, password: e.target.value })}
              value={password}
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
      </Route>
    </main>
  )
}


