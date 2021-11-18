import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ ingridient }) {

  return (
    <div className={`${IngredientDetailsStyles.ingredientDetails} pr-10 pl-10 pb-15`}>
      <h1 className={`text text_type_main-large`}>Детали ингредиента</h1>
      <img src={ingridient.image_large} alt={ingridient.name}
        className={`${IngredientDetailsStyles.ingredientDetails__image} mb-4`}
      />
      <h2 className={`${IngredientDetailsStyles.ingredientDetails__name} text text_type_main-medium mb-8`}>
        {ingridient.name}
      </h2>
      <ul className={`${IngredientDetailsStyles.ingredientDetails__list}`}>
        <li className={`${IngredientDetailsStyles['ingredientDetails__list-elem']} mr-5`}>
          <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</h3>
          <p className={`text text_type_digits-default`}>{ingridient.calories}</p>
        </li>
        <li className={`${IngredientDetailsStyles['ingredientDetails__list-elem']} mr-5`}>
          <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</h3>
          <p className={`text text_type_digits-default`}>{ingridient.proteins}</p>
        </li>
        <li className={`${IngredientDetailsStyles['ingredientDetails__list-elem']} mr-5`}>
          <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</h3>
          <p className={`text text_type_digits-default`}>{ingridient.fat}</p>
        </li>
        <li className={`${IngredientDetailsStyles['ingredientDetails__list-elem']} mr-5`}>
          <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</h3>
          <p className={`text text_type_digits-default`}>{ingridient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingridient: PropTypes.object
}

export default IngredientDetails
