import React from "react";
import AppHeader from "../Header/Header";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import { serverUrl } from "../../utils/constants";
import AppStyles from "./App.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const App = () => {

  const bunIngridients = [];
  const sauceIngridients = [];
  const mainIngridients = [];

  const [ingridientData, setIngridientData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    const getIngridientsData = async () => {
      try {
        const res = await fetch(serverUrl);
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
  ingridientData.map(product => {
    if (product.type === 'bun')
      bunIngridients.push(product)
    else if (product.type === 'sauce')
      sauceIngridients.push(product)
    else if (product.type === 'main')
      mainIngridients.push(product)
  })

  // На данный момент захардкоженный объект заказа для рендера секции заказа.
  const burgerOrder = {
    bun: bunIngridients[1],
    sauce: sauceIngridients[1],
    mainIngridient: [mainIngridients[0], mainIngridients[4], mainIngridients[5]]
  }

  return (
    <>
      <AppHeader />
      <main className={`${AppStyles.main} pr-5 pl-5`}>
        {hasError && <p className={`${AppStyles.main__error} text text_type_main-default`}>
          Произошла ошибка: {errorMessage}
        </p>}
        {!isLoading &&
          !hasError &&
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
        }
      </main>
    </>
  )
}

export default App
