import { combineReducers } from 'redux';
import { feedIngredients } from './burgerIngredients';
import { ingredientDetails } from './ingredientDetails';
import { burgerConstructor } from './burgerConstructor';
import { orderDetails } from './orderDetails';
import { authUserReducer } from './userAuth';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  feedIngredients,
  ingredientDetails,
  burgerConstructor,
  orderDetails,
  authUserReducer,
  wsReducer
})
