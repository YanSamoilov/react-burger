import { useState } from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngStyles from './Ingredient.module.css';

function Ingredient({ image, name, price }) {
  const [count, setcount] = useState(1)

  return (
    <>
      {count > 0 && <Counter count={count} size={'default'} />}
      <img src={image} alt={name} className={`ml-4`} />
      <div className={`${IngStyles['ingredient__price-container']} mb-1 mt-1`}>
        <p className={`text text_type_digits-default mr-2`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngStyles['ingredient']} text text_type_main-default`}>{name}</h2>
    </>
  )
}

Ingredient.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

export default Ingredient
