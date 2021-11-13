import React from "react";
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridient from "../Ingridient/Ingridient";
import { productsData } from "../../utils/constants";
import BurgerIngrStyles from './BurgerIngredients.module.css';

const bunIngridients = [];
const sauceIngridients = [];
const mainIngridients = [];

//Разделить все ингридиенты по типам в массивы
productsData.map(product => {
  if (product.type === 'bun')
    bunIngridients.push(product)
  else if (product.type === 'sauce')
    sauceIngridients.push(product)
  else if (product.type === 'main')
    mainIngridients.push(product)
})

//На данный момент захардкоженный массив заказа для верстки правой секции-конструктора.
const burgerOrder = {
  bun: bunIngridients[1],
  sauce: sauceIngridients[0],
  mainIngridient: [mainIngridients[0], mainIngridients[4], mainIngridients[5]]
}

const FullTab = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent} >
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const renderIngridient = (({ image, name, price, _id }) => (
  <li key={_id} className={`${BurgerIngrStyles.burgerIngredients__listElement}`}>
    <Ingridient image={image} name={name} price={price} />
  </li>
  )
)

function BurgerIngredients({ bunIngridient, sauceIngridient, mainIngridient }) {
  return (
    <section className={`${BurgerIngrStyles.burgerIngredients} pt-10 mr-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <FullTab />
      <div className={BurgerIngrStyles.ingridientsContainer}>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Булки</h2>
        <ul className={`${BurgerIngrStyles.ingridientsList} pl-4 pr-4`}>
          {bunIngridient.map(renderIngridient)}
        </ul>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Соусы</h2>
        <ul className={`${BurgerIngrStyles.ingridientsList} pl-4 pr-4`}>
          {sauceIngridient.map(renderIngridient)}
        </ul>
        <h2 className={`text text_type_main-medium mt-10 mb-6`}>Начинки</h2>
        <ul className={`${BurgerIngrStyles.ingridientsList} pl-4 pr-4`}>
          {mainIngridient.map(renderIngridient)}
        </ul>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  bunIngridient: PropTypes.array,
  sauceIngridient: PropTypes.array,
  mainIngridient: PropTypes.array
}

export default BurgerIngredients
export { burgerOrder, bunIngridients, sauceIngridients, mainIngridients }
