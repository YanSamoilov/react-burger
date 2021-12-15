import { useState, useContext, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { postOrder } from 'utils/api';
import Modal from 'components/Modal/Modal';
import OrderDetails from "components/OrderDetails/OrderDetails";
import { AllIngredientsContext } from "utils/appContext";
import BurgConstructorStyles from "./BurgerConstructor.module.css";
import ConstructorIngredient from "components/ConstructorIngredient/ConstructorIngredient";
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENT_INSIDE_CONSTRUCTOR, TOGGLE_BUN_INSIDE_CONSTRUCTOR } from "../../services/actions/burgerConstructor"
import { useDrop } from "react-dnd";

  //Генерация уникальных ключей
  const genUniKey = () => (Date.now().toString(36) + Math.random().toString(36).substr(2));

// Создать элемент ингредиента внутри бургера.
const createInnerIngredient = ({ image, name, price, _id }, ind) => {
  return (
    <li key={genUniKey()} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2`}>
      <ConstructorIngredient
        name={name}
        image={image}
        price={price}
        _id={_id}
        ind={ind}
      />
    </li>
  );
}

function BurgerConstructor() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [totalIds, setTotalIds] = useState([]);
  const [orderNum, setOrderNum] = useState(0);
  const [errorOrderNum, setErrorOrderNum] = useState('');
  const constructorIngredients = useSelector(state => state.burgerConstructor.constructorElem);
  const allIngredientsData = useSelector(state => state.feedIngredients).ingredientsData;

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      addIngredientToConstructor(item)
    }
  })

  const dispatch = useDispatch();
  //Разделить выбранные ингредиенты для бургера на булки и внутренние ингредиенты.
  console.log(constructorIngredients);
  const bun = useMemo(() => constructorIngredients.find(product => product.type === 'bun'), [constructorIngredients]);
  const mainIngridient = useMemo(() => constructorIngredients.filter(product => product.type !== 'bun'), [constructorIngredients]);

  // //Расчет итоговой стоимости.
  const totalPrice = useMemo(() => (bun ? bun.price : 0) * 2 + mainIngridient.reduce((acc, elem) => acc + elem.price, 0), [constructorIngredients]);

  //Сбор всех id ингредиентов для конструктора.
  // useEffect(() => setTotalIds([].concat(bun._id).concat(sauce._id).concat(mainIngridient.map(elem => elem._id))), [bun, sauce, mainIngridient]);

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

  //Добавить ингредиент в конструктор.
  const addIngredientToConstructor = (item) => {
    //Найти перетаскиваемый ингредиент в полном списке ингредиентов.
    const dropedIngredient = allIngredientsData.find(ingr => ingr._id === item.id)

    //Если есть булка и перетаскиваемый объект тоже булка, то заменить в конструкторе, иначе добавить ингредиент.
    if (bun && dropedIngredient.type === 'bun') {
      dispatch({
        type: TOGGLE_BUN_INSIDE_CONSTRUCTOR,
        ingredient: dropedIngredient
      })
    }
    else {
      dispatch({
        type: ADD_INGREDIENT_INSIDE_CONSTRUCTOR,
        ingredient: dropedIngredient
      })
    }
  }

  if (constructorIngredients) {
    return (
      <section ref={dropTarget} className={`${BurgConstructorStyles['burger-constructor']} pt-25 pl-4`}>
        <ul className={`${BurgConstructorStyles['burger-constructor__bunList']}`}>
          {bun &&
            <ConstructorIngredient
              name={bun.name}
              price={bun.price}
              image={bun.image}
              typeIngredient={bun.type}
              type={'top'}
              key={genUniKey()}
              id={bun._id}
            />}
          <ul className={`${BurgConstructorStyles['burger-constructor__orderList']}`}>
            {mainIngridient.map(createInnerIngredient)}
          </ul>
          {bun &&
            <ConstructorIngredient
              name={bun.name}
              price={bun.price}
              image={bun.image}
              typeIngredient={bun.type}
              type={'bottom'}
              key={genUniKey()}
              id={bun._id}
            />}
        </ul>
        <div className={`${BurgConstructorStyles['burger-constructor__total-container']} mt-10`}>
          <div className={`${BurgConstructorStyles['burger-constructor__total-price-container']} mr-10`}>
            <p className={`${BurgConstructorStyles['burger-constructor__total-price']} text text_type_digits-medium`}>{totalPrice ? totalPrice : 0}</p>
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
}

export default BurgerConstructor
