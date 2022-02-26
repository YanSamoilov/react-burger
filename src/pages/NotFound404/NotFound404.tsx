import { Link } from "react-router-dom";
import styles404 from "./NotFound404.module.css";

function NotFound404 () {
  return (
    <div className={`${styles404.notFound}`}>
      <p className={`${styles404.notFound__text} text text_type_digits-large mt-20 mb-20`}>404</p>
      <p className={`${styles404.notFound__text} text text_type_main-medium mb-10`}>К сожалению, такая страница не найдена или находитя в разработке.</p>
      <p className={`${styles404.notFound__text} text text_type_main-medium`}>
        Перейти на <Link className={`${styles404.notFound__link}`} to={'/'}>главную страницу</Link></p>
    </div>
  )
}

export default NotFound404;
