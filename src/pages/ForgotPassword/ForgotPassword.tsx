import { useEffect, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import ForgotPasswordStyles from './ForgotPassword.module.css';
import Preloader from 'components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from 'services/types/hooks';
import { postEmailFromForgotPage } from 'services/actions/userAuth';


function ForgotPassword() {

  const history = useHistory();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const { isLoading, postEmailForgotPageErrorMessage, isEmail } = useAppSelector(state => state.authUserReducer);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const handleGetPermissionToChangePassword = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if(email) {
      dispatch(postEmailFromForgotPage(email));
    }
  }

  useEffect(() => {
    if(isEmail === 'pushToResetPage') history.push("/reset-password");
  }, [isEmail, history]);

  if (isLoading) {
    return (<Preloader />)
  }
  else {
    return (
      <section className={`${ForgotPasswordStyles['forgot-password']}`}>
        <form action="POST" className={`${ForgotPasswordStyles['forgot-password__form']}`} onSubmit={handleGetPermissionToChangePassword}>
          <h1 className={`${ForgotPasswordStyles['forgot-password__heading']} text text_type_main-medium`}>Восстановление пароля</h1>
          <Input value={email} onChange={onChangeEmail} name={'email'} size='default' placeholder='Укажите e-mail' />
          <Button disabled={email === ''} type="primary" size="large">Восстановить</Button>
        </form>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?
          <Link to={'/login'} className={`${ForgotPasswordStyles['forgot-password__link']} ml-2`}>Войти</Link>
        </p>
        {postEmailForgotPageErrorMessage &&
        <p className={`${ForgotPasswordStyles['forgot-password__error']} text text_type_main-default mt-4`}>{`Произошла ошибка: ${postEmailForgotPageErrorMessage}. Повторите попытку.`}</p>
        }
      </section>
    )
  }
}

export default ForgotPassword;
