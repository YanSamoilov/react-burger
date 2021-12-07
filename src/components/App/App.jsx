import { useState, useEffect } from "react";
import AppHeader from 'components/Header/Header';
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor";
import { AllIngredientsContext } from "utils/appContext";
import { getIngredientsData } from "utils/api";
import AppStyles from "./App.module.css";

function App() {

  const [ingredientData, setIngredientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getIngredientsData()
      .then((res) => {
        setIngredientData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        setIsLoading(false);
      })
  }, [])

  if (errorMessage) {
    return (<p className={`${AppStyles.main__error} text text_type_main-default`}>Произошла ошибка: {errorMessage}</p>)
  }
  else if (isLoading) {
    return (<p className={`${AppStyles.main__error} text text_type_main-default`}>Загрузка...</p>)
  }
  return (
    <>
      <AppHeader />
      <main className={`${AppStyles.main} pr-5 pl-5`}>
        <>
          <AllIngredientsContext.Provider value={ingredientData}>
            <BurgerIngredients />
            <BurgerConstructor />
          </AllIngredientsContext.Provider>
        </>
      </main>
    </>
  )
}

export default App
