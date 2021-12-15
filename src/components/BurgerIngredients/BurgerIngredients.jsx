import { useRef, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import FullTab from "components/FullTab/FullTab";
import Ingredient from "components/Ingridient/Ingredient";
import IngredientDetails from "components/IngredientDetails/IngredientDetails";
import Modal from "components/Modal/Modal";
import BurgerIngrStyles from './BurgerIngredients.module.css';
import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetails';

function BurgerIngredients() {
  const bunHeadingRef = useRef(null);
  const sauceHeadingRef = useRef(null);
  const mainIngredientHeadingRef = useRef(null);
  const { ingredientsData } = useSelector(state => state.feedIngredients);
  const { isModalActive, ingredientDetails } = useSelector(state => state.ingredientDetails);
  const dispatch = useDispatch();

  //Разделить все ингредиенты по типам в массивы
  const bunIngredient = useMemo(() => ingredientsData.filter(product => product.type === 'bun'), [ingredientsData]);
  const sauceIngredient = useMemo(() => ingredientsData.filter(product => product.type === 'sauce'), [ingredientsData]);
  const mainIngredient = useMemo(() => ingredientsData.filter(product => product.type === 'main'), [ingredientsData]);

  //Найти объект ингредиента по выбранному id
  const findSelectedIngredient = (selectIngredientId) => {
    return ingredientsData.find(ingr => ingr._id === selectIngredientId);
  }

  //Открыть модальное окно с данными ингредиента
  const handleOpenIngredient = (id) => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredientDetails: findSelectedIngredient(id),
    })
  }

  //Закрыть модальное окно
  const handleCloseIngredient = () => {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS,
      ingredientDetails: null,
    })
  }

  //Рендер списка ингредиента
  const renderIngredient = ({ image, name, price, _id }) => (
    <li id={_id} onClickCapture={() => handleOpenIngredient(_id)} key={_id} className={`${BurgerIngrStyles['burger-ingredients__list-elem']}`}>
      <Ingredient image={image} name={name} price={price} id={_id} />
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
          <IngredientDetails ingridient={ingredientDetails}></IngredientDetails>
        </Modal>}
    </section>
  )
}

export default BurgerIngredients
