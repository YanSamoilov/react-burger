import { combineReducers } from "redux";
import { feedIngredients } from "./burgerIngredients";
import { ingredientDetails } from "./ingredientDetails";
import { burgerConstructor } from "./burgerConstructor"

export const rootReducer = combineReducers({
  feedIngredients,
  ingredientDetails,
  burgerConstructor
})
