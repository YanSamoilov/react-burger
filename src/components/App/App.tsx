import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from 'pages/ForgotPassword/ForgotPassword';
import ResetPassword from 'pages/ResetPassword/ResetPassword';
import AppHeader from 'components/Header/Header';
import Profile from 'pages/Profile/Profile';
import BurgerIngredients from 'components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from 'components/BurgerConstructor/BurgerConstructor';
import NotFound404 from 'pages/NotFound404/NotFound404';
import { getIngredients } from 'services/actions/burgerIngredients';
import { useAppSelector, useAppDispatch } from 'services/types/hooks';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import IngredientDetailsPage from 'pages/IngredientDetailsPage/IngredientDetailsPage';
import { getUserDataAction } from 'services/actions/userAuth';
import Feed from 'pages/Feed/Feed';
import OrderDescriptionPage from 'pages/OrderDescriptionPage/OrderDescriptionPage';
import ProfileOrders from 'components/ProfileOrders/ProfileOrders';
import AppStyles from './App.module.css';


function App() {

  const dispatch = useAppDispatch();
  const location = useLocation<any>();
  const history = useHistory();

  const historyAction = history.action === 'PUSH';
  const { errorMessage, isLoading } = useAppSelector(state => state.feedIngredients);

  const background = historyAction && location.state && location.state.background;

  //Получить список ингредиентов от сервера.
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserDataAction());
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
        <Switch location={background || location}>
          <Route path='/' exact={true}>
            <>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </>
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/forgot-password'>
            <ForgotPassword />
          </Route>
          <Route path='/reset-password'>
            <ResetPassword />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/feed' exact>
            <Feed />
          </Route>
          <ProtectedRoute path='/profile' redirectPath='/login' exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders' redirectPath='/login' exact={true}>
            <ProfileOrders />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id' redirectPath='/login' exact={true}>
            <OrderDescriptionPage />
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact>
            <IngredientDetailsPage />
          </Route>
          <Route path='/feed/:id' exact>
            <OrderDescriptionPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default App
