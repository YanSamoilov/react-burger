import { useEffect, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import ResetPasswordStyles from './ResetPassword.module.css';
import { useAppDispatch, useAppSelector } from 'services/types/hooks';
import Preloader from 'components/Preloader/Preloader';
import { postNewPasswordAction } from 'services/actions/userAuth';


function ResetPassword() {

  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoadingAuth, postNewPasswordError, isEmail } = useAppSelector(state => state.authUserReducer);


  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if(isEmail === 'pushToLoginPage') history.push('/login');
    else if (isEmail === '') history.push('/forgot-password')
  }, [isEmail, history]);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handlePostNewPassword = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (password && value) {
      dispatch(postNewPasswordAction(password, value))
    }
  }

  if (isLoadingAuth) {
    return (<Preloader />)
  }
  return (
    <section className={`${ResetPasswordStyles['reset-password']}`}>
      <form action="POST" className={`${ResetPasswordStyles['reset-password__form']}`} onSubmit={handlePostNewPassword}>
        <h1 className={`${ResetPasswordStyles['reset-password__heading']} text text_type_main-medium`}>Восстановление пароля</h1>
        <Input
          value={password}
          name={"password"}
          placeholder="Введите новый пароль"
          size="default"
          onChange={onChangePassword}
          icon={"ShowIcon"}
        />
        <Input placeholder={'Введите код из письма'} name={'token'} onChange={onChangeValue} value={value} />
        <Button disabled={password === '' && value === ''} type="primary" size="large">Сохранить</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль?
        <Link to={'/login'} className={`${ResetPasswordStyles['reset-password__link']} ml-2`}>Войти</Link>
      </p>
      {postNewPasswordError &&
        <p className={`${ResetPasswordStyles['reset-password']} text text_type_main-default mt-4`} >{`Произошла ошибка: ${postNewPasswordError}. Повторите попытку.`}</p>
      }
    </section>
  )
}

export default ResetPassword;
