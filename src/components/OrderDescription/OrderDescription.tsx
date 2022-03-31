import { useAppSelector } from "services/types/hooks";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { convertDate } from "utils/dateOrderFeedPage";
import { IIngredient, IOrderData } from "services/types/data";
import styles from "./OrderDescription.module.css";

interface IIdIngredientsList {
  [key: string]: number
}

function OrderDescription({ orderData }: IOrderData) {

  const { ingredientsData } = useAppSelector(state => state.feedIngredients);

  //Создать объект с полями id ингредиентов и значениями их количества в заказе.
  const ingredientsFromOrder = orderData.ingredients.reduce((acc: IIdIngredientsList, n: string) => (acc[n] = (acc[n] || 0) + 1, acc), {});
  let totalPrice = 0;

  //Создать карточку ингредиента в списке.
  const createIngredientElement = (ingredientData: IIngredient, count: number) => {
    ingredientData.type === 'bun' ? totalPrice += ingredientData.price * 2 : totalPrice += ingredientData.price * count;
    return (
      <li key={uuidv4()} className={`${styles[`orderDscr__flex-container`]}`}>
        <img className={`${styles[`orderDscr__image`]} mr-4`} src={ingredientData.image} alt={ingredientData.name} />
        <div className={`${styles[`orderDscr__text-container`]}`}>
          <h3 className={`${styles[`orderDscr__ingr-heading`]} mr-4 text text_type_main-default`}>{ingredientData.name}</h3>
          <p className="text text_type_digits-default mr-2 mt-4">{ingredientData.type === 'bun' ? 2 : count} x {ingredientData.price}</p>
        </div>
        <div className="mt-4 mr-6">
          <CurrencyIcon type="primary" />
        </div>
      </li>
    )
  }

  //Рендер всех карточек ингредиентов из заказа.
  const renderIngredientElement = (ingredientsFromOrder: IIdIngredientsList) => {
    const allIngredientsCards = [];
    //Перебор всех ингредиентов в заказе, их поиск и добавление в массив для последующей отрисовки.
    for (let ingredient in ingredientsFromOrder) {
      const ingredientData = ingredientsData.filter((el) => el._id === ingredient);
      allIngredientsCards.push(createIngredientElement(ingredientData[0], ingredientsFromOrder[ingredient]));
    }
    return allIngredientsCards
  }

  return (
    <div className={`${styles.orderDscr} pr-10 pl-10 pb-10`}>
      <h1 className={`${styles.orderDscr__number} text text_type_digits-default mb-10`}>#{orderData.number}</h1>
      <h1 className="text text_type_main-medium mb-3">{orderData.name}</h1>
      <p className={`${styles.orderDscr__status} text text_type_main-default mb-15`}>{orderData.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <ul className={`${styles[`orderDscr__list`]}`}>
        {renderIngredientElement(ingredientsFromOrder)}
      </ul>
      <div className={`${styles[`orderDscr__footer-container`]}`}>
        <p className={`${styles.orderDscr__date} text text_type_main-default text_color_inactive`}>{convertDate(orderData.createdAt)}</p>
        <div className={`${styles[`orderDscr__flex-container`]}`}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderDescription;
