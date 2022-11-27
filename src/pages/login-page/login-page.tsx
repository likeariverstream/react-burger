import styles from './login-page.module.css';
import React, { FC, FormEventHandler } from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { getLoginUser } from '../../services/actions/login';
import { useDispatch } from '../../utils/hooks';
import { useForm } from '../../utils/hooks';
import { getCookie } from '../../utils/coockie';

export const LoginPage: FC = () => {
  const login: boolean = !!getCookie('access')
  const dispatch = useDispatch(); 
  const history = useHistory();
  const {values, setValues} = useForm({email: '', password: ''});
  const {email, password} = values
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const user = values
    dispatch(getLoginUser(user))
  }
  React.useEffect(() => {
    if (login) {
      history.push('/')
    }
  }, [history, login])

  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <main className={styles.main}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>
        <div className='mt-6'>
          <Input type='email' placeholder={'E-mail'}
            onChange={e => setValues({...values, email: e.target.value})}
            value={email}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'} />
        </div>
        <div className='mt-6 mb-6'>
          <PasswordInput
            onChange={e => setValues({...values, password: e.target.value})}
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
