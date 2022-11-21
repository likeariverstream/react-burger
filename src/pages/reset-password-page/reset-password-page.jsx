import styles from './reset-password-page.module.css';
import React from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { getResetPasswordSuccessThunk } from '../../services/actions/reset-password';
import { useSelector } from 'react-redux';
import { FunctionComponent } from 'react';

export const ResetPasswordPage = ()  => {

  const login = JSON.parse(sessionStorage.getItem('login'));
  const recovered = useSelector(state => state.recoverPassword.success)
  const resetPassword = (e) => {
    e.preventDefault();
    getResetPasswordSuccessThunk()
  }

  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  if (login) {
    return (<Redirect to={'/profile'} />)
  }

  
  if (!recovered) {
    return (<Redirect to={'/forgot-password'} />)
  }


  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={resetPassword}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <div className='mt-6'>
          <PasswordInput
            onChange={e => setValue(e.target.value)}
            type='password'
            placeholder={'Введите новый пароль'}
            icon={'ShowIcon'} value='' />
        </div>
        <div className='mt-6 mb-6'>
          <Input type='text' placeholder={'Введите код из письма'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
          />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'>Сохранить</Button>
        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вспомнили пароль?
          <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
      </form>
    </main >
  )
}
