import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR, CHANGE_INGREDIENT_POSITION } from '../../services/actions/burgerConstructor';
import PropTypes from 'prop-types';
import ConstructorIngredientStyles from './ConstructorIngredient.module.css';

function ConstructorIngredient({ name, image, price, uid }) {

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor-item',
    item: { uid }
  });

  const [, dropRef] = useDrop({
    accept: 'constructor-item',
    hover: (item) => {
      dispatch({
        type: CHANGE_INGREDIENT_POSITION,
        dragUid: item.uid,
        hoverUid: uid
      })
    }
  });

  function attachRef(el) {
    dragRef(el)
    dropRef(el)
  }

  // Удалить ингредиент из конструктора.
  const handleDeleteIngredient = (uid) => {
    dispatch({
      type: REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
      uid: uid
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
        handleClose={() => handleDeleteIngredient(uid)}
      />
    </div>
  )
}

ConstructorIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired
};

export default ConstructorIngredient
