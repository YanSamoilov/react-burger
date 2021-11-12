import React from "react";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productsData } from "../utils/constants";
import BurgConstructorStyles from "./BurgerConstructor.module.css";

const createConstructorElement = (({ image, name, price, _id }) =>
  <li key={_id} className={`${BurgConstructorStyles.orderList__element} mr-2`}>
    <DragIcon />
    <ConstructorElement
      isLocked={true}
      text={name}
      price={price}
      thumbnail={image}
    />
  </li>
)

class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={`${BurgConstructorStyles.burgerConstructor} pt-25 pl-4`}>
        <ul className={`${BurgConstructorStyles.orderList} mb-10`}>
          {productsData.map(createConstructorElement)}
        </ul>
        <div className={BurgConstructorStyles.totalContainer}>
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
}

export default BurgerConstructor
