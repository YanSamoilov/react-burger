import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import stylesHeader from "./Header.module.css";

function AppHeader() {

  const { pathname } = useLocation();
  const typeProfileIcon = pathname === '/profile' ? 'primary' : 'secondary';
  const typeBurgerIcon = pathname === '/' ? 'primary' : 'secondary';
  const typeListIcon = pathname === '/404' ? 'primary' : 'secondary';

  return (
    <header className={`${stylesHeader.header} pt-4 pb-4`}>
      <nav className={stylesHeader.header__nav}>
        <ul className={`${stylesHeader['header__nav-list']}`}>
          <li>
            <NavLink
              exact
              to={'/'}
              className={`${stylesHeader['header__nav-link']} text text_type_main-default text_color_inactive pl-5 pr-5`}
              activeClassName={`${stylesHeader['header__nav-link_active']} pl-5 pr-5`}
            >
              <BurgerIcon type={typeBurgerIcon} />
              <p className="ml-2">Конструктор</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/feed'}
              className={`${stylesHeader['header__nav-link']} text text_type_main-default text_color_inactive pl-5 pr-5`}
              activeClassName={`${stylesHeader['header__nav-link_active']} pl-5 pr-5`}
            >
              <ListIcon type={typeListIcon} />
              <p className="ml-2">Лента заказов</p>
            </NavLink>
          </li>
          <li className={`${stylesHeader['header__nav-link_right']}`}>
            <NavLink
              to={'/profile'}
              className={`${stylesHeader['header__nav-link']} text text_type_main-default text_color_inactive pl-5 pr-5`}
              activeClassName={`${stylesHeader['header__nav-link_active']} pl-5 pr-5`}
            >
              <ProfileIcon type={typeProfileIcon} />
              <p className="ml-2">Личный кабинет</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to={'/'} className={`${stylesHeader.header__logo}`}>
        <Logo />
      </Link>
    </header>
  )
}

export default AppHeader
