import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngStyles from './Ingredient.module.css';

function Ingredient({ image, name, price, id }) {

  const [count, setcount] = useState(0)

  const ingredientsInsideConstructor = useSelector(state => state.burgerConstructor.constructorElem);

  // Подсчет количества каждого ингредиента в конструкторе.
  useEffect(() => {
    setcount(ingredientsInsideConstructor.reduce((acc, el) => el._id === id ? acc + 1 : acc, 0))
  }, [ingredientsInsideConstructor])

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    })
  });

  return (
    <div ref={dragRef} style={{ opacity }}>
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
