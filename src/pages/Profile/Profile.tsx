import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from 'services/types/hooks';
import { logoutUser, patchNewUserDataAction } from 'services/actions/userAuth';
import { useAppSelector } from 'services/types/hooks';
import ProfileStyles from './Profile.module.css';
import Preloader from 'components/Preloader/Preloader';
import { clearConstructor } from 'services/actions/burgerConstructor';

function Profile() {

  const dispatch = useAppDispatch();

  const { email, name } = useAppSelector(state => state.authUserReducer.user);
  const { changeUserResultMessage, isLoading } = useAppSelector(state => state.authUserReducer);

  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(email);
  const [inputName, setInputName] = useState(name);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value)
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearConstructor());
  }

  const handleSaveNewUserData = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (login && password && inputName) {
      dispatch(patchNewUserDataAction({ email: login, password: password, name: inputName }));
    }
  }

  const handleCancelChanges = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setLogin(email);
    setInputName(name);
    setPassword('');
  }

  if (isLoading) {
    return <Preloader />
  }
  return (
    <section className={`${ProfileStyles.profile}`}>
      <div>
        <ul className={`${ProfileStyles.profile__list}`}>
          <li className={`${ProfileStyles['profile__list-element']}`}>
            <NavLink
              to={'/profile'}
              className={`${ProfileStyles['profile__link']} text text_type_main-medium `}
              activeClassName={`${ProfileStyles['profile__link_active']} text text_type_main-medium`}>
              Профиль
            </NavLink>
          </li>
          <li className={`${ProfileStyles['profile__list-element']}`}>
            <NavLink
              to={'/404'}
              className={`${ProfileStyles['profile__link']} text text_type_main-medium text_color_inactive`}
              activeClassName={`${ProfileStyles['profile__link_active']} text text_type_main-medium`}>
              История заказов
            </NavLink>
          </li>
          <button onClick={handleLogout} className={`${ProfileStyles['profile__exit']} text text_type_main-medium text_color_inactive`}>Выход</button>
        </ul>
        <p className={`${ProfileStyles['profile__text']} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
        <p className={`${ProfileStyles['profile__result']} text text_type_main-default mt-5`}>{changeUserResultMessage}</p>
      </div>
      <form method="POST" name="profile" className={`${ProfileStyles['profile__form']}`} onSubmit={handleSaveNewUserData}>
        <div className={`${ProfileStyles['form']}`}>
          <Input placeholder='Имя' icon='EditIcon' onChange={onChangeName} value={inputName} />
        </div>
        <div className={`${ProfileStyles['form']}`}>
          <Input placeholder='Логин' icon='EditIcon' onChange={onChangeLogin} value={login} />
        </div>
        <div className={`${ProfileStyles['form']}`}>
          <Input placeholder='Пароль' icon='EditIcon' onChange={onChangePassword} value={password} />
        </div>
        <div className={`${ProfileStyles['profile__buttons-container']}`}>
          <Button>Сохранить</Button>
          <button onClick={handleCancelChanges} className={`${ProfileStyles['profile__cansel']} text text_type_main-medium ml-20`}>Отмена</button>
        </div>
      </form>
    </section>
  )
}

export default Profile
