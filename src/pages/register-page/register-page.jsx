import styles from './register-page.module.css';
import React from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { getRegisterUser } from '../../services/actions/register'
import { useDispatch, useSelector } from 'react-redux';
// это функция компонента страницы регистрации
// возвращает разметку с инпутами и кнопкой
export function RegisterPage() {
  const success = useSelector(state => state.user.success);
  const dispatch = useDispatch();
  const hangleRegister = (e) => {
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

  const inputRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <main className={styles.main}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
      <div className='mt-6 mb-6'>
        <Input type='text' placeholder={'Имя'}
          onChange={e => setValue({...value, name: e.target.value})}
          value={value.name}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'} />
      </div>
      <Input type='email' placeholder={'E-mail'}
        onChange={e => setValue({...value, email: e.target.value})}
        value={value.email}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'} />
      <div className='mt-6 mb-6'>
        <PasswordInput
          onChange={e => setValue({...value, password: e.target.value})}
          value={value.password}
          type='password' placeholder={'Пароль'} icon={'ShowIcon'} />
      </div>
      <Button
        onClick={hangleRegister}
        htmlType='submit'
        type='primary'
        size='medium'>Зарегистрироваться</Button>

      <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Уже зарегистрированы?
        <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
      {success ? <Redirect to={'/login'}/> : <Redirect to={'/register'}/>}
    </main >
  )
}
