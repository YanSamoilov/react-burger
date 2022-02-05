import Preloader from "components/Preloader/Preloader";
import { useParams } from "react-router-dom";
import { useAppSelector } from "services/types/hooks";
import IngredientPageStyles from './IngredientDetailsPage.module.css';

function IngredientDetailsPage() {

  interface IUseParams {
    id: string
  }

  const { id } = useParams<IUseParams>();
  const { isLoading, errorMessage, ingredientsData } = useAppSelector(state => state.feedIngredients);

  const ingredientDetails: any = ingredientsData.find(ingr => ingr._id === id)

  if (!isLoading && !errorMessage && ingredientDetails) {
    return (
      <div className={`${IngredientPageStyles.ingredientDetailsPage} pr-10 pl-10 pb-15`}>
        <h1 className={`${IngredientPageStyles.ingredientDetailsPage__name} text text_type_main-large`}>Детали ингредиента</h1>
        <img src={ingredientDetails.image_large} alt={ingredientDetails.name}
          className={`${IngredientPageStyles.ingredientDetailsPage__image} mb-4`}
        />
        <h2 className={`${IngredientPageStyles.ingredientDetailsPage__name} text text_type_main-medium mb-8`}>
          {ingredientDetails.name}
        </h2>
        <ul className={`${IngredientPageStyles.ingredientDetailsPage__list}`}>
          <li className={`${IngredientPageStyles['ingredientDetailsPage__list-elem']} mr-5`}>
            <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</h3>
            <p className={`text text_type_digits-default`}>{ingredientDetails.calories}</p>
          </li>
          <li className={`${IngredientPageStyles['ingredientDetailsPage__list-elem']} mr-5`}>
            <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</h3>
            <p className={`text text_type_digits-default`}>{ingredientDetails.proteins}</p>
          </li>
          <li className={`${IngredientPageStyles['ingredientDetailsPage__list-elem']} mr-5`}>
            <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</h3>
            <p className={`text text_type_digits-default`}>{ingredientDetails.fat}</p>
          </li>
          <li className={`${IngredientPageStyles['ingredientDetailsPage__list-elem']} mr-5`}>
            <h3 className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</h3>
            <p className={`text text_type_digits-default`}>{ingredientDetails.carbohydrates}</p>
          </li>
        </ul>
      </div>
    )
  }
  return (
    <Preloader />
  )
}

export default IngredientDetailsPage;
