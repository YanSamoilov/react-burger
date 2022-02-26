import { useState } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/types/hooks';
import { registerUser } from 'services/actions/userAuth';
import RegisterStyles from './Register.module.css';
import Preloader from 'components/Preloader/Preloader';

function Register() {

  const dispatch = useAppDispatch();
  const { isLoading, registerErrorMessage } = useAppSelector(state => state.authUserReducer);

  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handlePostRegister = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (value && email && password) {
      dispatch(registerUser({ name: value, email: email, password: password }));
    }
  }

  if (isLoading) {
    return <Preloader />
  }
  return (
    <section className={`${RegisterStyles.register}`}>
      <form action="POST" className={`${RegisterStyles.register__form}`} onSubmit={handlePostRegister}>
        <h1 className={`${RegisterStyles.register__heading} text text_type_main-medium`}>Регистрация</h1>
        <Input placeholder={'Имя'} name={'name'} value={value} onChange={onChangeName} />
        <EmailInput onChange={onChangeEmail} value={email} name={'email'} size='default' />
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} size='default' />
        <Button disabled={value === '' && email === '' && password === ''} type="primary" size="large">Зарегистрироваться</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Уже зарегистрированы?
        <Link to={'/login'} className={`${RegisterStyles.register__link} ml-2`}>Войти</Link>
      </p>
      <p className={`${RegisterStyles.register__error} text text_type_main-default mt-4`}>{registerErrorMessage}</p>
    </section>
  )
}

export default Register;
