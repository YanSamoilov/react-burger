import { useState, useContext, useMemo, useEffect } from "react";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from 'components/Modal/Modal';
import OrderDetails from "components/OrderDetails/OrderDetails";
import { AllIngridientsContext } from "utils/appContext";
import BurgConstructorStyles from "./BurgerConstructor.module.css";

// Создать элемент ингридиента внутри бургера.
const createInnerIngridient = (({ image, name, price, _id }) => (
  <li key={_id} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2`}>
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

function BurgerConstructor() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalIds, setTotalIds] = useState([]);
  const dataIngridients = useContext(AllIngridientsContext);

  //Установить рандомно выбранные ингридиенты для бургера(временно).
  const bun = useMemo(() => dataIngridients.filter(product => product.type === 'bun'), [dataIngridients]);
  const sauce = useMemo(() => dataIngridients.filter(product => product.type === 'sauce'), [dataIngridients]);
  const mainIngridient = useMemo(() => dataIngridients.filter(product => product.type === 'main'), [dataIngridients]);

  //Рассчет итоговой стоимости и сбор всех id ингириентов для конструктора
  useEffect(() => {
    setTotalPrice(bun[1].price * 2 + sauce[0].price + mainIngridient.reduce((acc, elem) => acc + elem.price, 0))
    setTotalIds([].concat(bun[1]._id).concat(sauce[0]._id).concat(mainIngridient.map(elem => elem._id)))
  }, [dataIngridients])

  const handleOpenModal = () => {
    setIsActiveModal(true);
  }

  const handleCloseModal = () => {
    setIsActiveModal(false);
  }

  return (
    <section className={`${BurgConstructorStyles['burger-constructor']} pt-25 pl-4`}>
      {createBunIngridient(bun[1], 'top', `${bun[1]._id}`)}
      <ul className={`${BurgConstructorStyles['burger-constructor__orderList']}`}>
        {createInnerIngridient(sauce[0])}
        {mainIngridient.map(createInnerIngridient)}
      </ul>
      {createBunIngridient(bun[1], 'bottom', `${bun[1]._id}bottom`)}
      <div className={`${BurgConstructorStyles['burger-constructor__total-container']} mt-10`}>
        <div className={`${BurgConstructorStyles['burger-constructor__total-price-container']} mr-10`}>
          <p className={`${BurgConstructorStyles['burger-constructor__total-price']} text text_type_digits-medium`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {isActiveModal &&
        <Modal handleCloseModal={handleCloseModal}>
          <OrderDetails arrayOrderId={totalIds} />
        </Modal>}
    </section>
  )
}

export default BurgerConstructor
