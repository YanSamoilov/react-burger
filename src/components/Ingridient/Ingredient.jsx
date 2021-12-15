import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngStyles from './Ingredient.module.css';
import { useSelector, useDispatch } from 'react-redux';

function Ingredient({ image, name, price, id }) {
  const [count, setcount] = useState(0)

  const ingredientsInsideConstructor = useSelector(state => state.burgerConstructor.constructorElem);

  useEffect(() => {
    setcount(ingredientsInsideConstructor.reduce((acc, el)=> el._id == id ? acc + 1 : acc, 0))
  }, [ingredientsInsideConstructor])

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {id}
  });

  return (
    <div ref={dragRef}>
      {count > 0 && <Counter count={count} size={'default'} />}
      <img src={image} alt={name} className={`ml-4`} />
      <div className={`${IngStyles['ingredient__price-container']} mb-1 mt-1`}>
        <p className={`text text_type_digits-default mr-2`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngStyles['ingredient']} text text_type_main-default`}>{name}</h2>
    </div>
  )
}

Ingredient.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

export default Ingredient
