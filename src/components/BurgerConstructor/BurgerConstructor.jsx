import { useState, useContext, useMemo, useEffect } from "react";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { postOrder } from 'utils/api';
import Modal from 'components/Modal/Modal';
import OrderDetails from "components/OrderDetails/OrderDetails";
import { AllIngredientsContext } from "utils/appContext";
import BurgConstructorStyles from "./BurgerConstructor.module.css";

// Создать элемент ингредиента внутри бургера.
const createInnerIngredient = (({ image, name, price, _id }, ind) => (
  <li key={`${_id}${ind}`} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2`}>
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
const createBunIngredient = (({ image, name, price }, type, _id, side) => (
  <li key={_id} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2 ml-8`}>
    <ConstructorElement
      type={type}
      isLocked={true}
      text={`${name} (${side})`}
      price={price}
      thumbnail={image}
    />
  </li>
)
)

function BurgerConstructor() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [totalIds, setTotalIds] = useState([]);
  const [orderNum, setOrderNum] = useState(0);
  const [errorOrderNum, setErrorOrderNum] = useState('');
  const dataIngredients = useContext(AllIngredientsContext);

  //Установить выбранные ингредиенты для бургера(временно).
  const bun = useMemo(() => dataIngredients.find(product => product.type === 'bun'), [dataIngredients]);
  const sauce = useMemo(() => dataIngredients.find(product => product.type === 'sauce'), [dataIngredients]);
  const mainIngridient = useMemo(() => dataIngredients.filter(product => product.type === 'main'), [dataIngredients]);

  //Расчет итоговой стоимости.
  const totalPrice = useMemo(() => bun.price * 2 + sauce.price + mainIngridient.reduce((acc, elem) => acc + elem.price, 0), [bun, sauce, mainIngridient]);

  //Сбор всех id ингредиентов для конструктора.
  useEffect(() => setTotalIds([].concat(bun._id).concat(sauce._id).concat(mainIngridient.map(elem => elem._id))), [bun, sauce, mainIngridient]);

  //Получить номер заказа от сервера.
  const getOrder = () => {
    postOrder(totalIds)
      .then((res) => {
        setOrderNum(res.order.number)
      })
      .catch((err) => {
        setErrorOrderNum(`Ошибка ${err}`)
      })
      .finally(() => {
        handleOpenModal()
      })
  }

  const handleOpenModal = () => {
    setIsActiveModal(true);
  }

  const handleCloseModal = () => {
    setIsActiveModal(false);
  }

  return (
    <section className={`${BurgConstructorStyles['burger-constructor']} pt-25 pl-4`}>
      <ul className={`${BurgConstructorStyles['burger-constructor__bunList']}`}>
        {createBunIngredient(bun, 'top', `${bun._id}`, 'верх')}
        <ul className={`${BurgConstructorStyles['burger-constructor__orderList']}`}>
          {createInnerIngredient(sauce)}
          {mainIngridient.map(createInnerIngredient)}
        </ul>
        {createBunIngredient(bun, 'bottom', `${bun._id}bottom`, 'низ')}
      </ul>
      <div className={`${BurgConstructorStyles['burger-constructor__total-container']} mt-10`}>
        <div className={`${BurgConstructorStyles['burger-constructor__total-price-container']} mr-10`}>
          <p className={`${BurgConstructorStyles['burger-constructor__total-price']} text text_type_digits-medium`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={getOrder}>
          Оформить заказ
        </Button>
      </div>
      {isActiveModal &&
        <Modal handleCloseModal={handleCloseModal}>
          <OrderDetails orderNum={orderNum} errorOrderNum={errorOrderNum} />
        </Modal>}
    </section>
  )
}

export default BurgerConstructor
