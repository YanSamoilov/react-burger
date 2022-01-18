import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from "./Header.module.css";

function AppHeader() {
  return (
    <header className={`${stylesHeader.header} pt-4 pb-4`}>
      <nav className={stylesHeader.header__nav}>
        <ul className={`${stylesHeader['header__nav-list']}`}>
          <li>
            <a className={`${stylesHeader['header__nav-link']} pl-5 pr-5 mr-2`}>
              <BurgerIcon type={"primary"} />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
          </li>
          <li>
            <a className={`${stylesHeader['header__nav-link']} pl-5 pr-5`}>
              <ListIcon type={"secondary"} />
              <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </a>
          </li>
          <li className={`${stylesHeader['header__nav-link_right']}`}>
            <a className={`${stylesHeader['header__nav-link']} pl-5 pr-5`}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
      <a href="#" className={`${stylesHeader.header__logo}`}>
        <Logo />
      </a>
    </header>
  )
}

export default AppHeader
