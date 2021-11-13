import AppHeader from "../Header/Header";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { burgerOrder } from "../BurgerIngredients/BurgerIngredients";
import { bunIngridients, sauceIngridients, mainIngridients } from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={`${AppStyles.main} pr-5 pl-5`}>
        <BurgerIngredients bunIngridient={bunIngridients} sauceIngridient={sauceIngridients} mainIngridient={mainIngridients}/>
        <BurgerConstructor bun={burgerOrder.bun} sauce={burgerOrder.sauce} mainIngridient={burgerOrder.mainIngridient} />
      </main>
    </>
  )
}

export default App
