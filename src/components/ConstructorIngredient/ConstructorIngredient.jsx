import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredientStyles from './ConstructorIngredient.module.css';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR } from '../../services/actions/burgerConstructor';
import { CHANGE_INGREDIENT_POSITION } from '../../services/actions/burgerConstructor';
import React, { useRef } from "react";

function ConstructorIngredient({ name, price, image, typeIngredient, type, ind }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'constructorElem',
    item: { ind }
  })

  let dragElemIndex = 0;
  let hoverIndex = 0;

  const [, dropRef] = useDrop({
    accept: 'constructorElem',
    hover(item, monitor) {
      dragElemIndex = item;
      hoverIndex = ind;

      dispatch({
        type: CHANGE_INGREDIENT_POSITION,
        dragElemIndex: dragElemIndex,
        hoverIndex: hoverIndex
      })
    }
  });

  //Удалить ингредиент из конструктора.
  const handleDeleteIngredient = (ind) => {
    dispatch({
      type: REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
      ind: ind,
    })
  }

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  if (typeIngredient === "bun" && name) {
    return (
      <li className={`${ConstructorIngredientStyles['burger-constructor__orderList-element']} mr-2 ml-8`}>
        <div>
          <ConstructorElement
            type={type}
            isLocked={true}
            text={`${name} (${type === 'top' ? 'верх' : 'низ'})`}
            price={price}
            thumbnail={image}
          />
        </div>
      </li>
    )
  }
  return (
    <>
      <div className={`${ConstructorIngredientStyles['burger-constructor__orderList-element']} mr-2`} ref={dragDropRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          style={{ width: '100%' }}
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => handleDeleteIngredient(ind)}
        />
      </div>
    </>

    // <li ref={dropTarget} className={`${ConstructorIngredientStyles['burger-constructor__orderList-element']} mr-2`}>
    //   <div ref={dragRef}>
    //     <DragIcon />
    //     <ConstructorElement
    //       isLocked={false}
    //       text={name}
    //       price={price}
    //       thumbnail={image}
    //       handleClose={() => handleDeleteIngredient(ind)}
    //     />
    //   </div>
    // </li>
  )
}

export default ConstructorIngredient
