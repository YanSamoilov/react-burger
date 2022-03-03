import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from 'services/types/hooks';
import { authUser } from 'services/actions/userAuth';
import { useAppSelector } from 'services/types/hooks';
import LoginStyles from './Login.module.css';

function Login() {

  const dispatch = useAppDispatch();
  const location = useLocation<any>();
  const { isAuth, authErrorMessage } = useAppSelector(state => state.authUserReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };

  const postLogin = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    if (email && password) {
      dispatch(authUser({ email: email, password: password }));
    }
  };

  if (isAuth) {
    return (
      <Redirect to={location.state?.from || '/'} />
    )
  }
  return (
    <section className={`${LoginStyles.login}`}>
      <form method="POST" name="login" noValidate className={`${LoginStyles.login__form}`} onSubmit={postLogin}>
        <h1 className={`${LoginStyles.login__heading} text text_type_main-medium`}>Вход</h1>
        <EmailInput onChange={onChangeEmail} value={email} name={'email'} size='default' />
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} size='default' />
        <Button disabled={email === '' && password === ''} type="primary" size="large">Войти</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20 mb-4'>
        Вы - новый пользователь?
        <Link to={'/register'} className={`${LoginStyles.login__link} ml-2`}>Зарегистрироваться</Link>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link to={'/forgot-password'} className={`${LoginStyles.login__link} ml-2`}>Восстановить пароль</Link>
      </p>
      <p className={`${LoginStyles.login__error} text text_type_main-default mt-4`}>{authErrorMessage}</p>
    </section>
  )
}

export default Login;
