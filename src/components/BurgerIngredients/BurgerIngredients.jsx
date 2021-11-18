import React from "react";
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridient from "../Ingridient/Ingridient";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import BurgerIngrStyles from './BurgerIngredients.module.css';
import Modal from "../Modal/Modal";

function BurgerIngredients({ bunIngridient, sauceIngridient, mainIngridient }) {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [selectIngridient, setSelectIngridient] = React.useState(null);
  const bunHeadingRef = React.useRef(null);
  const sauceHeadingRef = React.useRef(null);
  const mainIngridientHeadingRef = React.useRef(null);

  const FullTab = () => {
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={(value) => {
          setCurrent(value);
          bunHeadingRef.current.scrollIntoView();
        }} >
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={(value) => {
          setCurrent(value);
          sauceHeadingRef.current.scrollIntoView();
          }}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={(value) => {
          setCurrent(value);
          mainIngridientHeadingRef.current.scrollIntoView();
        }}>
          Начинки
        </Tab>
      </div>
    )
  }

//Создать единый массив всех ингридиентов
  const arrayAllIngridients = bunIngridient.concat(sauceIngridient.concat(mainIngridient))

//Найти объект ингридиента по выбранному id
  const findSelectIngridient = (selectIngridientId) => {
    return arrayAllIngridients.find(ingr => ingr._id === selectIngridientId);
  }

//Открыть модальное окно с данными ингридиента
  const handleOpenIngridient = (e) => {
    setSelectIngridient(findSelectIngridient(e.currentTarget.id))
    setIsModalActive(true);
  }

//Закрыть модальное окно
  const handleCloseIngridient = () => {
    setIsModalActive(false)
  }

//Рендер списка ингридиента
  const renderIngridient = (({ image, name, price, _id }) => (
    <li id={_id} onClickCapture={handleOpenIngridient} key={_id} className={`${BurgerIngrStyles['burger-ingredients__list-elem']}`}>
      <Ingridient image={image} name={name} price={price} />
    </li>
  )
  )

  return (
    <section className={`${BurgerIngrStyles['burger-ingredients']} pt-10 mr-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <FullTab />
      <div className={`${BurgerIngrStyles['burger-ingredients__container']}`}>
        <h2 ref={bunHeadingRef} className={`text text_type_main-medium mt-10 mb-6`}>Булки</h2>
        <ul className={`${BurgerIngrStyles['burger-ingredients__ingridients-list']} pl-4 pr-4`}>
          {bunIngridient.map(renderIngridient)}
        </ul>
        <h2 ref={sauceHeadingRef} className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h2>
        <ul className={`${BurgerIngrStyles['burger-ingredients__ingridients-list']} pl-4 pr-4`}>
          {sauceIngridient.map(renderIngridient)}
        </ul>
        <h2 ref={mainIngridientHeadingRef} className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h2>
        <ul className={`${BurgerIngrStyles['burger-ingredients__ingridients-list']} pl-4 pr-4`}>
          {mainIngridient.map(renderIngridient)}
        </ul>
      </div>
      {isModalActive &&
        <Modal handleCloseModal={handleCloseIngridient}>
          <IngredientDetails ingridient={selectIngridient}></IngredientDetails>
        </Modal>}
    </section>
  )
}

BurgerIngredients.propTypes = {
  bunIngridient: PropTypes.array,
  sauceIngridient: PropTypes.array,
  mainIngridient: PropTypes.array
}

export default BurgerIngredients
