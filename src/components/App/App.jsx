import { useState, useEffect } from "react";
import AppHeader from 'components/Header/Header';
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor";
import { AllIngridientsContext } from "utils/appContext";
import { getIngridientsData } from "utils/api";
import AppStyles from "./App.module.css";

function App() {

  const [ingridientData, setIngridientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getIngridientsData()
      .then((res) => {
        setIngridientData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setErrorMessage(error);
        setIsLoading(false);
      })
  }, [])

  if (hasError) {
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
          <AllIngridientsContext.Provider value={ingridientData}>
            <BurgerIngredients />
            <BurgerConstructor />
          </AllIngridientsContext.Provider>
        </>
      </main>
    </>
  )
}

export default App
