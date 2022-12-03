import styles from './register-page.module.css';
import React, { FC, FormEventHandler } from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { getRegisterUser } from '../../services/actions/register'
import { useDispatch, useSelector } from '../../utils/hooks';
import { useForm } from '../../utils/hooks';
import { routes } from '../../utils/constants';

export const RegisterPage: FC = () => {
  const success = useSelector(state => state.user.success);
  const dispatch = useDispatch();
  const { isLoggedIn: login } = useSelector(state => state.login)
  const { values, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const {
    name,
    email,
    password } = values

  const hangleRegister: FormEventHandler = (e) => {
    e.preventDefault();
    const user = values;
    dispatch(getRegisterUser(user));
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
    alert('Icon Click Callback')
  }

  if (login) {
    return (<Redirect to={routes.profile} />)
  }

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={hangleRegister}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
        <div className='mt-6 mb-6'>
          <Input type='text' placeholder={'Имя'}
            onChange={e => setValues({ ...values, name: e.target.value })}
            value={name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'} />
        </div>
        <Input type='email'
          placeholder={'E-mail'}
          onChange={e => setValues({ ...values, email: e.target.value })}
          value={email}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'} />
        <div className='mt-6 mb-6'>
          <PasswordInput
            onChange={e => setValues({ ...values, password: e.target.value })}
            value={password}
            placeholder={'Пароль'}
            icon={'ShowIcon'} />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'>Зарегистрироваться</Button>
        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Уже зарегистрированы?
          <Link to={routes.login} className={`${styles.link} ml-2`}>Войти
          </Link>
        </p>
        {success ? <Redirect to={routes.login} /> : <Redirect to={routes.register} />}
      </form>
    </main >
  )
}
