import styles from './forgot-password-page.module.css';
import React, {FC, FormEventHandler} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getPasswordSuccessThunk } from '../../services/actions/forgot-password';
import { Redirect } from 'react-router-dom';

export const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const success: boolean = useSelector(state => state.recoverPassword.success);
  const login: boolean = JSON.parse(sessionStorage.getItem('login') as string);

  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
    alert('Icon Click Callback')
  }
  const handleClick: FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
    e.preventDefault();
    dispatch(getPasswordSuccessThunk());
  }, [dispatch])

  if (login) {
    return (<Redirect to={'/profile'} />)
  }

  if (success) {
    return (<Redirect to={'/reset-password'} />)
  }

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleClick}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <div className='mt-6 mb-6'>
          <Input type='email' placeholder={'Укажите e-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
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
        >Восстановить</Button>
        <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вспомнили пароль?
          <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
      </form>
    </main >
  )
}