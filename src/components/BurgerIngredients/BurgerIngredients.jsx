import { useState, useRef, useCallback, useContext, useMemo } from "react";
import FullTab from "components/FullTab/FullTab";
import Ingredient from "components/Ingridient/Ingredient";
import IngredientDetails from "components/IngredientDetails/IngredientDetails";
import Modal from "components/Modal/Modal";
import BurgerIngrStyles from './BurgerIngredients.module.css';
import { AllIngredientsContext } from "utils/appContext";


function BurgerIngredients() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectIngredient, setSelectIngredient] = useState(null);
  const bunHeadingRef = useRef(null);
  const sauceHeadingRef = useRef(null);
  const mainIngredientHeadingRef = useRef(null);
  const dataIngridients = useContext(AllIngredientsContext);

  //Разделить все ингредиенты по типам в массивы
  const bunIngredient = useMemo(() => dataIngridients.filter(product => product.type === 'bun'), [dataIngridients]);
  const sauceIngredient = useMemo(() => dataIngridients.filter(product => product.type === 'sauce'), [dataIngridients]);
  const mainIngredient = useMemo(() => dataIngridients.filter(product => product.type === 'main'), [dataIngridients]);

  //Найти объект ингредиента по выбранному id
  const findSelectedIngredient = (selectIngredientId) => {
    return dataIngridients.find(ingr => ingr._id === selectIngredientId);
  }

  //Открыть модальное окно с данными ингредиента
  const handleOpenIngredient = (id) => {
    setSelectIngredient(findSelectedIngredient(id))
    setIsModalActive(true);
  }

  //Закрыть модальное окно
  const handleCloseIngredient = () => {
    setIsModalActive(false)
  }

  //Рендер списка ингредиента
  const renderIngredient = ({ image, name, price, _id }) => (
    <li id={_id} onClickCapture={() => handleOpenIngredient(_id)} key={_id} className={`${BurgerIngrStyles['burger-ingredients__list-elem']}`}>
      <Ingredient image={image} name={name} price={price} />
    </li>
  )

  return (
    <section className={`${BurgerIngrStyles['burger-ingredients']} pt-10 mr-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <FullTab bunHeadingRef={bunHeadingRef} sauceHeadingRef={sauceHeadingRef} mainIngredientHeadingRef={mainIngredientHeadingRef} />
      <div className={`${BurgerIngrStyles['burger-ingredients__container']}`}>
        <h2 ref={bunHeadingRef} className={`text text_type_main-medium mt-10 mb-6`}>Булки</h2>
        <ul className={`${BurgerIngrStyles['burger-ingredients__ingridients-list']} pl-4 pr-4`}>
          {bunIngredient.map(renderIngredient)}
        </ul>
        <h2 ref={sauceHeadingRef} className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h2>
        <ul className={`${BurgerIngrStyles['burger-ingredients__ingridients-list']} pl-4 pr-4`}>
          {sauceIngredient.map(renderIngredient)}
        </ul>
        <h2 ref={mainIngredientHeadingRef} className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h2>
        <ul className={`${BurgerIngrStyles['burger-ingredients__ingridients-list']} pl-4 pr-4`}>
          {mainIngredient.map(renderIngredient)}
        </ul>
      </div>
      {isModalActive &&
        <Modal handleCloseModal={handleCloseIngredient}>
          <IngredientDetails ingridient={selectIngredient}></IngredientDetails>
        </Modal>}
    </section>
  )
}

export default BurgerIngredients
