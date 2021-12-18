import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR, CHANGE_INGREDIENT_POSITION } from '../../services/actions/burgerConstructor';
import ConstructorIngredientStyles from './ConstructorIngredient.module.css';

function ConstructorIngredient({ name, image, price, index }) {

  const dispatch = useDispatch();

  const constructorItems = useSelector((state) => state.burgerConstructor.constructorElem);

  const isBun = constructorItems[0].type === "bun";

  const [, dragRef] = useDrag({
    type: 'constructor-item',
    item: { index }
  });

  const [, dropRef] = useDrop({
    accept: 'constructor-item',
    hover: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      dispatch({
        type: CHANGE_INGREDIENT_POSITION,
        dragIndex: dragIndex + (isBun ? 1 : 0),
        hoverIndex: hoverIndex + (isBun ? 1 : 0)
      })
      item.index = hoverIndex
    }
  });

  function attachRef(el) {
    dragRef(el)
    dropRef(el)
  }

  // Удалить ингредиент из конструктора.
  const handleDeleteIngredient = (ind) => {
    dispatch({
      type: REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
      ind: ind,
    })
  };

  return (
    <div ref={attachRef} className={`${ConstructorIngredientStyles['burger-constructor__element']}`}>
      <DragIcon />
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleDeleteIngredient(index)}
      />
    </div>
  )
}

export default ConstructorIngredient
