import { useRef, useMemo, useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import FullTab from 'components/FullTab/FullTab';
import Ingredient from 'components/Ingridient/Ingredient';
import IngredientDetails from 'components/IngredientDetails/IngredientDetails';
import Modal from 'components/Modal/Modal';
import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../../services/constants/ingredientDetails';
import { IIngredient } from '../../services/types/data';
import { useAppSelector, useAppDispatch } from 'services/types/hooks';
import BurgerIngrStyles from './BurgerIngredients.module.css';

function BurgerIngredients() {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();

  const bunHeadingRef = useRef<HTMLHeadingElement>(null);
  const sauceHeadingRef = useRef<HTMLHeadingElement>(null);
  const mainIngredientHeadingRef = useRef<HTMLHeadingElement>(null);

  const { ingredientsData } = useAppSelector(state => state.feedIngredients);
  const { ingredientDetails } = useAppSelector(state => state.ingredientDetails);

  const [value, setValue] = useState("one");

  // Разделить все ингредиенты по типам в массивы.
  const bunIngredient = useMemo(() => ingredientsData.filter(product => product.type === 'bun'), [ingredientsData]);
  const sauceIngredient = useMemo(() => ingredientsData.filter(product => product.type === 'sauce'), [ingredientsData]);
  const mainIngredient = useMemo(() => ingredientsData.filter(product => product.type === 'main'), [ingredientsData]);

  // Найти объект ингредиента по выбранному id.
  const findSelectedIngredient = (selectIngredientId: string) => {
    return ingredientsData.find(ingr => ingr._id === selectIngredientId);
  };

  // Открыть модальное окно с данными ингредиента.
  const handleOpenIngredient = (id: string) => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredientDetails: findSelectedIngredient(id),
    })
  };

  // Закрыть модальное окно.
  const handleCloseIngredient = () => {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS,
      ingredientDetails: null,
    })
    history.replace('/');
  };

  // Рендер списка ингредиента.
  const renderIngredient = ({ image, name, price, _id }: IIngredient) => (
    <li id={_id} onClickCapture={() => handleOpenIngredient(_id)} key={_id} className={`${BurgerIngrStyles['burger-ingredients__list-elem']}`}>
      <Link className={`${BurgerIngrStyles['burger-ingredients__link']}`} to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location }
      }}
      >
        <Ingredient image={image} name={name} price={price} id={_id} />
      </Link>
    </li>
  );

  // Расчет координат заголовков для своевременного переключения при скролле.
  const handleScroll = useCallback((e) => {
    // Координаты верхней части списка ингредиентов.
    const mainBlockTopCoordinate: number = e.target.getBoundingClientRect().top;

    // Получить координаты заголовков.
    const getCoordinates = (ref: React.RefObject<HTMLHeadingElement>) => {
      if (ref.current !== null) {
        return {
          top: ref.current.getBoundingClientRect().top,
        };
      } else {
        return {
          top: mainBlockTopCoordinate,
        };
      }
    };

    // Расчет близости заголовков к блоку ингредиентов.

    const bunHeaderCoordinates = Math.abs(getCoordinates(bunHeadingRef).top - mainBlockTopCoordinate);
    const sauceHeaderCoordinates = Math.abs(getCoordinates(sauceHeadingRef).top - mainBlockTopCoordinate);
    const mainIngredientCoordinates = Math.abs(getCoordinates(mainIngredientHeadingRef).top - mainBlockTopCoordinate);

    // Сравнение координат заголовков для актуальной их подсветки.
    sauceHeaderCoordinates > mainIngredientCoordinates ?
      setValue("three") :
      bunHeaderCoordinates > sauceHeaderCoordinates ?
        setValue("two") : setValue("one");
  }, []);

  return (
    <section className={`${BurgerIngrStyles['burger-ingredients']} pt-10 mr-10`} >
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <FullTab bunHeadingRef={bunHeadingRef} sauceHeadingRef={sauceHeadingRef} mainIngredientHeadingRef={mainIngredientHeadingRef} value={value} />
      <div className={`${BurgerIngrStyles['burger-ingredients__container']}`} onScroll={handleScroll}>
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
      {ingredientDetails && (
        <Modal handleCloseModal={handleCloseIngredient}>
          <IngredientDetails ingredient={ingredientDetails}></IngredientDetails>
        </Modal>
      )}
    </section>
  )
}

export default BurgerIngredients
