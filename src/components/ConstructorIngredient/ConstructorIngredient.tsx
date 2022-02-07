import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorIngredientProps } from 'services/types/data';
import { useAppDispatch } from 'services/types/hooks';
import ConstructorIngredientStyles from './ConstructorIngredient.module.css';
import { changeIngredientPosition, removeIngredientInsideConstructor } from 'services/actions/burgerConstructor';

function ConstructorIngredient({ name, image, price, uid }: IConstructorIngredientProps) {

  const dispatch = useAppDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor-item',
    item: { uid }
  });

  const [, dropRef] = useDrop({
    accept: 'constructor-item',
    hover: (item: { uid: string }) => {
      if (uid) {
        dispatch(changeIngredientPosition(item.uid, uid)
        )
      }
    }
  });

  function attachRef(el: any) {
    dragRef(el)
    dropRef(el)
  }

  // Удалить ингредиент из конструктора.
  const handleDeleteIngredient = (uid: string | undefined) => {
    if (uid) {
      dispatch(removeIngredientInsideConstructor(uid))
    }
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
