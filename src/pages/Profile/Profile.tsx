import { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from 'services/types/hooks';
import { patchNewUserDataAction } from 'services/actions/userAuth';
import { useAppSelector } from 'services/types/hooks';
import Preloader from 'components/Preloader/Preloader';
import ProfileNav from 'components/ProfileNav/ProfileNav';
import ProfileStyles from './Profile.module.css';

function Profile() {

  const dispatch = useAppDispatch();

  const { email, name } = useAppSelector(state => state.authUserReducer.user);
  const { isLoading } = useAppSelector(state => state.authUserReducer);

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
      <ProfileNav />
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
