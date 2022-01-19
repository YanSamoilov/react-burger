import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from 'components/Header/Header';
import BurgerIngredients from 'components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from 'components/BurgerConstructor/BurgerConstructor';
import { getIngredients } from 'services/actions/burgerIngredients';
import { useAppSelector, useAppDispatch } from 'services/types/hooks';
import AppStyles from './App.module.css';

function App() {

  const dispatch = useAppDispatch();

  const { errorMessage, isLoading } = useAppSelector(state => state.feedIngredients)

  //Получить список ингредиентов от сервера.
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

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
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </>
      </main>
    </>
  )
}

export default App
