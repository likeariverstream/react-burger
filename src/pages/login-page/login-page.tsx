import styles from './login-page.module.css';
import React, { FC, FormEventHandler } from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { getLoginUser } from '../../services/actions/login';
import { useDispatch } from '../../utils/hooks';

export const LoginPage: FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const login = JSON.parse(sessionStorage.getItem('login') as string);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    }
    dispatch(getLoginUser(user))
  }
  React.useEffect(() => {
    if (login) {
      history.push('/')
    }
  }, [login, history])

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>
        <div className='mt-6'>
          <Input type='email' placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'} />
        </div>
        <div className='mt-6 mb-6'>
          <PasswordInput
            onChange={e => setPassword(e.target.value)}
            placeholder={'Пароль'}
            value={password} />
        </div>
        <Button
          htmlType='submit'
          type='primary'
          size='medium'>Войти</Button>
      </form>
      <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вы - новый пользователь?
        <Link to='/register' className={`${styles.link} ml-2`}>Зарегистрироваться</Link></p>
      <p className={`${styles.text} text text_type_main-default`}>Забыли пароль?
        <Link to='/forgot-password' className={`${styles.link} ml-2`}>Восстановить пароль</Link></p>
    </main >
  )
}
