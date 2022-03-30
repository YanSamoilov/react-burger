import Preloader from "components/Preloader/Preloader";
import { IFeedOrder, IIngredient } from "services/types/data";
import { useAppSelector } from "services/types/hooks";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesOrderFeed from "./OrderFeed.module.css";
import { convertDate } from "utils/dateOrderFeedPage";

export default function OrderFeed({ orderData }: {orderData: IFeedOrder}) {

  const { ingredientsData } = useAppSelector(state => state.feedIngredients);
  let zIndex = 7;

  /*Создать массив из ингредиентов в заказе. Из-за ошибки с данными на сервере это промежуточный вариант,тк попадают undefined ингредиенты.
  Этот промежуточный массив  можно будет заменить на fullDataOrderIngredient после исправления*/
  const fullDataOrderIngredientPreliminary = orderData.ingredients.map((id: string) => {
    return  ingredientsData.find(ingredient => ingredient._id === id)
  });

  //Создать массив из ингредиентов в заказе из промежуточного, исключая undefined.
  const fullDataOrderIngredient = fullDataOrderIngredientPreliminary.filter((el: IIngredient | undefined) => el !== undefined);
  //Рассчитать стоимость заказа.
  let price = 0;
  for(let ingredient of fullDataOrderIngredient) {
    if(ingredient)
      ingredient.type === 'bun' ? price += ingredient.price * 2 : price += ingredient.price
  }


  //Добавить картинку ингредиента в карточку заказа.
  const createImage = (ingredient: IIngredient | undefined, count: number) => {
    zIndex--;
    if(ingredient) {
      return (
        <li key={uuidv4()} className={`${stylesOrderFeed['orderFeed__image-list-elem']}`} style={{ zIndex: zIndex }}>
          <img src={ingredient.image} alt={ingredient.name} className={`${stylesOrderFeed['orderFeed__image']}`} />
          {count !== 0 && <span className={`${stylesOrderFeed['orderFeed__count']} text text_type_main-default`}>+{count}</span>}
        </li>
      )
    }
  }

  //Рендер картинок ингредиентов карточки заказа.
  const renderImagesIngredients = (fullDataOrderIngredient: (IIngredient | undefined)[]) => {
    const arr = [];
    if(fullDataOrderIngredient) {
      for (let ind = 0; ind <= fullDataOrderIngredient.length - 1; ind++) {
        if (ind === 5) {
          arr.push(createImage(fullDataOrderIngredient[ind], fullDataOrderIngredient.length - 5));
          return arr
        }
        else {
          arr.push(createImage(fullDataOrderIngredient[ind], 0));
        }
      }
    }
    return arr
  }

  if (ingredientsData && fullDataOrderIngredient) {
    return (
      <>
        <div className={`${stylesOrderFeed['orderFeed__number-date-container']} text text_type_digits-default mb-6`}>
          <p className={`${stylesOrderFeed['orderFeed__text']} text text_type_digits-default`}>{`#${orderData.number}`}</p>
          <p className={`${stylesOrderFeed['orderFeed__text']} text text_type_main-default text_color_inactive`}>{convertDate(orderData.createdAt)}</p>
        </div>
        <h2 className={`${stylesOrderFeed['orderFeed__text']} text text_type_main-medium`}>{orderData.name}</h2>
        <div className={`${stylesOrderFeed['orderFeed__bottom']} mt-6`}>
          <ul className={`${stylesOrderFeed['orderFeed__image-list']}`}>
            {renderImagesIngredients(fullDataOrderIngredient)}
          </ul>
          <div className={`${stylesOrderFeed['orderFeed__price-container']}`}>
            <p className={`${stylesOrderFeed['orderFeed__price']} text text_type_main-medium`}>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </>
    )
  }
  return <Preloader />
}
