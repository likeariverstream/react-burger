import styles from './register-page.module.css';
import React, { FC, FormEventHandler } from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { getRegisterUser } from '../../services/actions/register'
import { useDispatch, useSelector } from '../../utils/hooks';

export const RegisterPage: FC = () => {
  const success = useSelector(state => state.user.success);
  const login: boolean = JSON.parse(sessionStorage.getItem('login') as string);

  const dispatch = useDispatch();
  const hangleRegister: FormEventHandler = (e) => {
    e.preventDefault();
    const user = {
      name: value.name,
      email: value.email,
      password: value.password
    };
    dispatch(getRegisterUser(user));
  }

  const [value, setValue] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
    alert('Icon Click Callback')
  }

  if (login) {
    return (<Redirect to={'/profile'} />)
  }

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={hangleRegister}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
        <div className='mt-6 mb-6'>
          <Input type='text' placeholder={'Имя'}
            onChange={e => setValue({ ...value, name: e.target.value })}
            value={value.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'} />
        </div>
        <Input type='email'
          placeholder={'E-mail'}
          onChange={e => setValue({ ...value, email: e.target.value })}
          value={value.email}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'} />
        <div className='mt-6 mb-6'>
          <PasswordInput
            onChange={e => setValue({ ...value, password: e.target.value })}
            value={value.password}
            placeholder={'Пароль'}
            icon={'ShowIcon'} />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'>Зарегистрироваться</Button>
        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Уже зарегистрированы?
          <Link to='/login' className={`${styles.link} ml-2`}>Войти
          </Link>
        </p>
        {success ? <Redirect to={'/login'} /> : <Redirect to={'/register'} />}
      </form>
    </main >
  )
}