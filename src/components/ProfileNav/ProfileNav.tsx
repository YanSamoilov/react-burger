import { NavLink } from 'react-router-dom';
import { clearConstructor } from 'services/actions/burgerConstructor';
import { logoutUser } from 'services/actions/userAuth';
import { useAppDispatch, useAppSelector } from 'services/types/hooks';
import ProfileNavStyles from './ProfileNav.module.css';

function ProfileNav() {

  const dispatch = useAppDispatch();

  const { changeUserResultMessage } = useAppSelector(state => state.authUserReducer);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearConstructor());
  }

  return (
    <div>
      <ul className={`${ProfileNavStyles.profile__list}`}>
        <li className={`${ProfileNavStyles['profile__list-element']}`}>
          <NavLink
            exact
            to={'/profile'}
            className={`${ProfileNavStyles['profile__link']} text text_type_main-medium text_color_inactive`}
            activeClassName={`${ProfileNavStyles['profile__link_active']} text text_type_main-medium`}>
            Профиль
          </NavLink>
        </li>
        <li className={`${ProfileNavStyles['profile__list-element']}`}>
          <NavLink
            exact
            to={'/profile/orders'}
            className={`${ProfileNavStyles['profile__link']} text text_type_main-medium text_color_inactive`}
            activeClassName={`${ProfileNavStyles['profile__link_active']} text text_type_main-medium`}>
            История заказов
          </NavLink>
        </li>
        <button onClick={handleLogout} className={`${ProfileNavStyles['profile__exit']} text text_type_main-medium text_color_inactive`}>Выход</button>
      </ul>
      <p className={`${ProfileNavStyles['profile__text']} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
      <p className={`${ProfileNavStyles['profile__result']} text text_type_main-default mt-5`}>{changeUserResultMessage}</p>
    </div>
  )
}

export default ProfileNav;
