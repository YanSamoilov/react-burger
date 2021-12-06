import { useState, useRef, useCallback, useContext, useMemo } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridient from "components/Ingridient/Ingridient";
import IngredientDetails from "components/IngredientDetails/IngredientDetails";
import Modal from "components/Modal/Modal";
import BurgerIngrStyles from './BurgerIngredients.module.css';
import { AllIngridientsContext } from "utils/appContext";


function BurgerIngredients() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectIngridient, setSelectIngridient] = useState(null);
  const bunHeadingRef = useRef(null);
  const sauceHeadingRef = useRef(null);
  const mainIngridientHeadingRef = useRef(null);
  const dataIngridients = useContext(AllIngridientsContext);

  const FullTab = () => {
    const [current, setCurrent] = useState('one')
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

  //Разделить все ингридиенты по типам в массивы
  const bunIngridient = useMemo(() => dataIngridients.filter(product => product.type === 'bun'), [dataIngridients]);
  const sauceIngridient = useMemo(() => dataIngridients.filter(product => product.type === 'sauce'), [dataIngridients]);
  const mainIngridient = useMemo(() => dataIngridients.filter(product => product.type === 'main'), [dataIngridients]);

  //Найти объект ингридиента по выбранному id
  const findSelectedIngridient = (selectIngridientId) => {
    return dataIngridients.find(ingr => ingr._id === selectIngridientId);
  }

  //Открыть модальное окно с данными ингридиента
  const handleOpenIngridient = (id) => {
    setSelectIngridient(findSelectedIngridient(id))
    setIsModalActive(true);
  }

  //Закрыть модальное окно
  const handleCloseIngridient = () => {
    setIsModalActive(false)
  }

  //Рендер списка ингридиента
  const renderIngridient = useCallback(({ image, name, price, _id }) => (
    <li id={_id} onClickCapture={() => handleOpenIngridient(_id)} key={_id} className={`${BurgerIngrStyles['burger-ingredients__list-elem']}`}>
      <Ingridient image={image} name={name} price={price} />
    </li>
  ), [{ bunIngridient, sauceIngridient, mainIngridient }])

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

export default BurgerIngredients
