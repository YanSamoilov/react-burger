import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from 'components/Modal/Modal';
import OrderDetails from 'components/OrderDetails/OrderDetails';
import ConstructorIngredient from 'components/ConstructorIngredient/ConstructorIngredient';
import { HANDLE_CLOSE_ORDER_MODAL } from '../../services/constants/orderDetails';
import { ADD_INGREDIENT_INSIDE_CONSTRUCTOR, TOGGLE_BUN_INSIDE_CONSTRUCTOR } from '../../services/constants/burgerConstructor';
import { getOrderDetails } from '../../services/actions/orderDetails';
import { IIngredient, IDroppedIngredientId } from '../../services/types/data';
import { useAppSelector, useAppDispatch } from 'services/types/hooks';
import BurgConstructorStyles from './BurgerConstructor.module.css';
import ModalOverlay from 'components/ModalOverlay/ModalOverlay';

function BurgerConstructor() {

  const dispatch = useAppDispatch();

  const errorMessage = useAppSelector(state => state.orderDetails.errorMessage);
  const allIngredientsData = useAppSelector(state => state.feedIngredients.ingredientsData);
  const orderNum = useAppSelector(state => state.orderDetails.orderNum);
  const isLoading = useAppSelector(state => state.orderDetails.isLoading);
  const constructorItems = useAppSelector(state => state.burgerConstructor.constructorElem);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: IDroppedIngredientId) {
      addItem(item);
    },
  });

  // Разделить выбранные ингредиенты для бургера на булки и внутренние ингредиенты.
  const bun = useMemo(() => constructorItems.find(product => product.type === 'bun'), [constructorItems]);
  const mainIngridient = useMemo(() => constructorItems.filter(product => product.type !== 'bun'), [constructorItems]);

  // Расчет итоговой стоимости.
  const totalPrice = useMemo(() => (bun ? bun.price : 0) * 2 + mainIngridient.reduce((acc, elem) => acc + elem.price, 0), [bun, mainIngridient]);

  // Добавить ингредиент из списка в конструктор.
  const addItem = (item: IDroppedIngredientId) => {
    // Найти перетаскиваемый ингредиент в полном списке ингредиентов.
    const dropedIngredient: IIngredient | undefined = allIngredientsData.find(ingr => ingr._id === item.id)

    // Если есть булка и перетаскиваемый объект тоже булка, то заменить в конструкторе, иначе добавить ингредиент.
    if (dropedIngredient !== undefined) {
      if (bun && dropedIngredient.type === 'bun') {
        dispatch({
          type: TOGGLE_BUN_INSIDE_CONSTRUCTOR,
          ingredient: dropedIngredient
        })
      }
      else {
        dispatch({
          type: ADD_INGREDIENT_INSIDE_CONSTRUCTOR,
          ingredient: {
            ...dropedIngredient,
            uid: uuidv4()
          }
        })
      }
    }
  };

  //  Создать элемент ингредиента в конструкторе. Ключ на основе индекса.
  const createInnerIngredient = ({ image, name, price, uid }: IIngredient) => {
    return (
      <li key={uid} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2`}>
        <ConstructorIngredient
          name={name}
          image={image}
          price={price}
          uid={uid}
        />
      </li>
    );
  };

  // Создать элемент булки в конструкторе.
  const createBunIngredient = ({ image, name, price, uid }: IIngredient, type: 'top' | 'bottom', side: string) => {
    return (
      <li key={`${uid}${side}`} className={`${BurgConstructorStyles['burger-constructor__orderList-element']} mr-2 ml-8`}>
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
    const totalIds: Array<string> = constructorItems.map((el) => el._id);
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
        {isLoading && (
          <ModalOverlay>
            <div className={`${BurgConstructorStyles['burger-constructor__order-preloader']}`}></div>
          </ModalOverlay>
        )}
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
