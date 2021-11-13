import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import BurgConstructorStyles from "./BurgerConstructor.module.css";

// Создать элемент ингридиента внутри бургера.
const createInnerIngridient = (({ image, name, price, _id }) => (
  <li key={_id} className={`${BurgConstructorStyles.orderList__element} mr-2`}>
    <DragIcon />
    <ConstructorElement
      isLocked={false}
      text={name}
      price={price}
      thumbnail={image}
    />
  </li>
  )
)

// Создать элемент булки.
const createBunIngridient = (({ image, name, price }, type, _id) => (
  <li key={_id} className={`${BurgConstructorStyles.orderList__element} mr-2 ml-8`}>
    <ConstructorElement
      type={type}
      isLocked={true}
      text={name}
      price={price}
      thumbnail={image}
    />
  </li>
  )
)

function BurgerConstructor(burgerOrder) {
  return (
    <section className={`${BurgConstructorStyles.burgerConstructor} pt-25 pl-4`}>
      {createBunIngridient(burgerOrder.bun, 'top', `${burgerOrder.bun._id}`)}
      <ul className={`${BurgConstructorStyles.orderList}`}>
        {createInnerIngridient(burgerOrder.sauce)}
        {burgerOrder.mainIngridient.map(createInnerIngridient)}
      </ul>
      {createBunIngridient(burgerOrder.bun, 'bottom', `${burgerOrder.bun._id}bottom`)}
      <div className={`${BurgConstructorStyles.totalContainer} mt-10`}>
        <div className={`${BurgConstructorStyles.totalPriceContainer} mr-10`}>
          <p className={`${BurgConstructorStyles.totalPrice} text text_type_digits-medium`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  burgerOrder: PropTypes.object
}

export default BurgerConstructor
