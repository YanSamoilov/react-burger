import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import AppStyles from "./App.module.css";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={`${AppStyles.main} pr-5 pl-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  )
}

export default App
