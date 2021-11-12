import React from "react";
import PropTypes from 'prop-types';
import { productsData } from "../utils/constants";
import IngStyles from './Ingridient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export { bunIngridient, sauceIngridient, mainIngridient, Ingridient }


let bunIngridient = [];
let sauceIngridient = [];
let mainIngridient = [];

productsData.map(product => {
  if (product.type === 'bun')
    bunIngridient.push(product)
  else if (product.type === 'sauce')
    sauceIngridient.push(product)
  else if (product.type === 'main')
    mainIngridient.push(product)
})

function Ingridient({ image, name, price }) {
  const [count, setcount] = React.useState(1)
  return (
    <>
      {count > 0 && <Counter count={count} size={'default'} />}
      <img src={image} alt={name} className={`ml-4`} />
      <div className={`${IngStyles.priceContainer} mb-1 mt-1`}>
        <p className={`text text_type_digits-default mr-2`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngStyles.nameIngr} text text_type_main-default`}>{name}</h2>
    </>
  )
}

Ingridient.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}
