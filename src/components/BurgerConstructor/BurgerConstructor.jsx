import { useState } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from 'components/Modal/Modal';
import OrderDetails from "components/OrderDetails/OrderDetails";
import { IngridientPropTypes } from "utils/constants";
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
  <li key={_id} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2 ml-8`}>
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
  const [isActiveModal, setIsActiveModal] = useState(false)

  const handleOpenModal = () => {
    setIsActiveModal(true);
  }

  const handleCloseModal = () => {
    setIsActiveModal(false);
  }

  return (
    <section className={`${BurgConstructorStyles['burger-constructor']} pt-25 pl-4`}>
      {createBunIngridient(burgerOrder.bun, 'top', `${burgerOrder.bun._id}`)}
      <ul className={`${BurgConstructorStyles['burger-constructor__orderList']}`}>
        {createInnerIngridient(burgerOrder.sauce)}
        {burgerOrder.mainIngridient.map(createInnerIngridient)}
      </ul>
      {createBunIngridient(burgerOrder.bun, 'bottom', `${burgerOrder.bun._id}bottom`)}
      <div className={`${BurgConstructorStyles['burger-constructor__total-container']} mt-10`}>
        <div className={`${BurgConstructorStyles['burger-constructor__total-price-container']} mr-10`}>
          <p className={`${BurgConstructorStyles['burger-constructor__total-price']} text text_type_digits-medium`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {isActiveModal &&
        <Modal handleCloseModal={handleCloseModal}>
          <OrderDetails />
        </Modal>}
    </section>
  )
}

BurgerConstructor.propTypes = {
  bun: IngridientPropTypes,
  mainIngridient: PropTypes.arrayOf(IngridientPropTypes),
  sauce: IngridientPropTypes
}

export default BurgerConstructor
