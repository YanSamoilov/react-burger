import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from 'components/Modal/Modal';
import OrderDetails from 'components/OrderDetails/OrderDetails';
import ConstructorIngredient from 'components/ConstructorIngredient/ConstructorIngredient';
import { HANDLE_CLOSE_ORDER_MODAL } from '../../services/actions/orderDetails';
import { ADD_INGREDIENT_INSIDE_CONSTRUCTOR, TOGGLE_BUN_INSIDE_CONSTRUCTOR } from '../../services/actions/burgerConstructor';
import { getOrderDetails } from '../../services/actions/orderDetails';
import BurgConstructorStyles from './BurgerConstructor.module.css';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const errorMessage = useSelector(state => state.orderDetails.errorMessage);
  const allIngredientsData = useSelector(state => state.feedIngredients.ingredientsData);
  const orderNum = useSelector(state => state.orderDetails.orderNum);
  const constructorItems = useSelector(state => state.burgerConstructor.constructorElem);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addItem(item);
    },
  });

  // Разделить выбранные ингредиенты для бургера на булки и внутренние ингредиенты.
  const bun = useMemo(() => constructorItems.find(product => product.type === 'bun'), [constructorItems]);
  const mainIngridient = useMemo(() => constructorItems.filter(product => product.type !== 'bun'), [constructorItems]);

  // Расчет итоговой стоимости.
  const totalPrice = useMemo(() => (bun ? bun.price : 0) * 2 + mainIngridient.reduce((acc, elem) => acc + elem.price, 0), [constructorItems]);

  // Добавить ингредиент из списка в конструктор.
  const addItem = (item) => {
    // Найти перетаскиваемый ингредиент в полном списке ингредиентов.
    const dropedIngredient = allIngredientsData.find(ingr => ingr._id === item.id)

    // Если есть булка и перетаскиваемый объект тоже булка, то заменить в конструкторе, иначе добавить ингредиент.
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
  };

  //  Создать элемент ингредиента в конструкторе. Ключ на основе индекса.
  const createInnerIngredient = ({ image, name, price, _id }, ind) => {
    return (
      <li key={ind} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2`}>
        <ConstructorIngredient
          name={name}
          image={image}
          price={price}
          id={_id}
          index={ind}
        />
      </li>
    );
  };

  // Создать элемент булки в конструкторе.
  const createBunIngredient = ({ image, name, price }, type, side) => {
    return (
      <li key={`${side}`} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2 ml-8`}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${name} (${side})`}
          price={price}
          thumbnail={image}
        />
      </li>
    )
  };

  //Получить номер заказа.
  const getOrder = () => {
    const totalIds = constructorItems.map((el) => el._id);
    if (totalIds.length) {
      dispatch(getOrderDetails(totalIds));
    }
  };

  //Закрыть модальное окно.
  const handleCloseModal = () => {
    dispatch({
      type: HANDLE_CLOSE_ORDER_MODAL
    })
  };

  const constructorBorder = `${BurgConstructorStyles['burger-constructor']} ${isHover ? BurgConstructorStyles.onHover : ""} pt-25 pl-4`;

  return (
    <>
      <section ref={dropTarget} className={constructorBorder}>
        <ul className={`${BurgConstructorStyles['burger-constructor__bunList']}`}>
          {bun && createBunIngredient(bun, 'top', 'верх')}
          <ul className={`${BurgConstructorStyles['burger-constructor__orderList']}`}>
            {mainIngridient.map(createInnerIngredient)}
          </ul>
          {bun && createBunIngredient(bun, 'bottom', 'низ')}
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
        {(orderNum || errorMessage) && (
          <Modal handleCloseModal={handleCloseModal}>
            <OrderDetails orderNum={orderNum} errorOrderNum={errorMessage} />
          </Modal>
        )}
      </section>
    </>
  );
};

export default BurgerConstructor;
