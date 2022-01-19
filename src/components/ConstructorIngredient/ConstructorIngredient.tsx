import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR, CHANGE_INGREDIENT_POSITION } from '../../services/constants/burgerConstructor';
import { IConstructorIngredientProps } from 'services/types/data';
import { useAppDispatch } from 'services/types/hooks';
import ConstructorIngredientStyles from './ConstructorIngredient.module.css';

function ConstructorIngredient({ name, image, price, uid }: IConstructorIngredientProps) {

  const dispatch = useAppDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor-item',
    item: { uid }
  });

  const [, dropRef] = useDrop({
    accept: 'constructor-item',
    hover: (item: { uid: string }) => {
      dispatch({
        type: CHANGE_INGREDIENT_POSITION,
        dragUid: item.uid,
        hoverUid: uid
      })
    }
  });

  function attachRef(el: any) {
    dragRef(el)
    dropRef(el)
  }

  // Удалить ингредиент из конструктора.
  const handleDeleteIngredient = (uid: string | undefined) => {
    dispatch({
      type: REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
      uid: uid
    })
  };

  return (
    <div ref={attachRef} className={`${ConstructorIngredientStyles['burger-constructor__element']}`}>
      <DragIcon type={'secondary'} />
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleDeleteIngredient(uid)}
      />
    </div>
  )
}

export default ConstructorIngredient
