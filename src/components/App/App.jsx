import { useState, useEffect, useMemo } from "react";
import AppHeader from 'components/Header/Header';
import BurgerIngredients from "components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "components/BurgerConstructor/BurgerConstructor";
import { INGREDIENTS_URL } from "utils/constants";
import AppStyles from "./App.module.css";

function App() {

  const [ingridientData, setIngridientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getIngridientsData = async () => {
      try {
        const res = await fetch(INGREDIENTS_URL);
        const data = await res.json();
        setIngridientData(data.data);
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    }
    getIngridientsData();
  }, [])

  //Разделить все ингридиенты по типам в массивы
  const bunIngridients = useMemo(() => ingridientData.filter(product => product.type === 'bun'), [ingridientData]);
  const sauceIngridients = useMemo(() => ingridientData.filter(product => product.type === 'sauce'), [ingridientData]);
  const mainIngridients = useMemo(() => ingridientData.filter(product => product.type === 'main'), [ingridientData]);

  // На данный момент захардкоженный объект заказа для рендера секции заказа.
  const burgerOrder = {
    bun: bunIngridients[1],
    sauce: sauceIngridients[1],
    mainIngridient: [mainIngridients[0], mainIngridients[4], mainIngridients[5]]
  }

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
          <BurgerIngredients
            bunIngridient={bunIngridients}
            sauceIngridient={sauceIngridients}
            mainIngridient={mainIngridients} />
          <BurgerConstructor
            bun={burgerOrder.bun}
            sauce={burgerOrder.sauce}
            mainIngridient={burgerOrder.mainIngridient} />
        </>
      </main>
    </>
  )
}

export default App
