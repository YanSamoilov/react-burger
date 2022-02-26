import OrderDescription from "components/OrderDescription/OrderDescription"
import Preloader from "components/Preloader/Preloader";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { wsConnectionStart, wsConnectionStartClosed, wsConnectionStartWithAuth } from "services/actions/wsActions";
import { IFeedOrder } from "services/types/data";
import { useAppDispatch, useAppSelector } from "services/types/hooks";
import styles from "./OrderDescriptionPage.module.css";


function OrderDescriptionPage() {

  interface IUseParams {
    id: string
  }
  const dispatch = useAppDispatch();
  const { id } = useParams<IUseParams>();
  const { orders, error } = useAppSelector(state => state.wsReducer);
  const { location } = useHistory();

  //Путь с какой страницы параметры заказа для получения от сервера соответствующего списка.
  const path = location.pathname.split('/')[1];
  //Id заказа из защищенной страницы.
  const idFromProtectedPage = location.pathname.split('/').pop();

  useEffect(() => {
    path === 'profile' ? dispatch(wsConnectionStartWithAuth()) : dispatch(wsConnectionStart());
    return () => { dispatch(wsConnectionStartClosed()) }
  }, [dispatch, path])

  //Поиск необходимого заказа.
  const currentOrderData = orders &&
    id === undefined ? orders.find((el: IFeedOrder) => el._id === idFromProtectedPage) : orders.find((el: IFeedOrder) => el._id === id);

  if (currentOrderData) {
    return (
      <div className={`${styles['order__main-container']}`}>
        <OrderDescription orderData={currentOrderData} />
      </div>
    )
  }
  else if (error) {
    return (<p className={`${styles.order__error} text text_type_main-default`}>Произошла ошибка соединения с сервером.</p>)
  }
  else {
    return <Preloader />
  }

}

export default OrderDescriptionPage
