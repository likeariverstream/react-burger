import styles from './forgot-password-page.module.css';
import React, { FC, FormEventHandler } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getPasswordSuccessThunk } from '../../services/actions/forgot-password';
import { Redirect } from 'react-router-dom';
import { useForm } from '../../utils/hooks';
import { routes } from '../../utils/constants'

export const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const success: boolean = useSelector(state => state.recoverPassword.success);
  const { isLoggedIn: login } = useSelector(state => state.login)
  const { values, setValues } = useForm({ email: '' });
  const { email } = values;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
  }
  const handleClick: FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
    e.preventDefault();
    dispatch(getPasswordSuccessThunk());
  }, [dispatch])

  if (login) {
    return (<Redirect to={routes.profile} />)
  }

  if (success) {
    return (<Redirect to={routes.resetPassword} />)
  }

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleClick}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <div className='mt-6 mb-6'>
          <Input type='email' placeholder={'Укажите e-mail'}
            onChange={e => setValues({ ...values, email: e.target.value })}
            value={email}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'} />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
        >Восстановить
        </Button>
        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вспомнили пароль?
          <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
      </form>
    </main >
  )
}
