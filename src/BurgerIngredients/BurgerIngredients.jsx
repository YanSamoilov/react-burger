import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { bunIngridient, sauceIngridient, mainIngridient, Ingridient } from "../Ingridient/Ingridient";
import BurgerIngrStyles from './BurgerIngredients.module.css';

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

const renderIngridient = ((product) =>
    <li key={product._id} className={`${BurgerIngrStyles.listElement}`}>
      <Ingridient image={product.image} name={product.name} price={product.price} />
    </li>
  )

class BurgerIngredients extends React.Component {
  render() {
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
}

export default BurgerIngredients
