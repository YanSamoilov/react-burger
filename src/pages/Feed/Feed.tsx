import { useEffect, useMemo } from "react";
import { wsConnectionStart, wsConnectionStartClosed } from "services/actions/wsActions";
import { useAppDispatch, useAppSelector } from "services/types/hooks";
import Preloader from "components/Preloader/Preloader";
import { IFeedOrder } from "services/types/data";
import Modal from "components/Modal/Modal";
import { removeCurrentOrderDetails } from "services/actions/orderDetails";
import { useHistory } from "react-router-dom";
import OrderDescription from "components/OrderDescription/OrderDescription";
import OrdersList from "components/OrdersList/OrdersList";
import stylesFeed from "./Feed.module.css";

function Feed() {

  const dispatch = useAppDispatch();
  const { orders, wsConnected, total, totalToday, error } = useAppSelector(state => state.wsReducer);
  const { currentOrderDetails } = useAppSelector(state => state.orderDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => { dispatch(wsConnectionStartClosed()) }
  }, [dispatch])


  const allOrdersDoneStatus = useMemo(() => { return orders.filter((order: IFeedOrder) => order.status === 'done') }, [orders]).slice(0, 10);
  const allOrdersPensingStatus = useMemo(() => { return orders.filter((order: IFeedOrder) => order.status === 'pending') }, [orders]).slice(0, 10);

  //Закрыть модальное окно.
  const handleCloseOrderDetails = () => {
    dispatch(removeCurrentOrderDetails());
    history.replace('/feed');
  }

  if (wsConnected && !error) {
    return (
      <section className={`${stylesFeed['feed']} mt-10`}>
        <div className={`${stylesFeed['feed__container']} mr-15`}>
          <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
          <OrdersList allOrders={orders} />
        </div>
        <div>
          <div className={`${stylesFeed['feed__status-container']} mb-15`}>
            <div className={`${stylesFeed['feed__done-container']}`}>
              <h2 className="text text_type_main-medium mt-15 mb-6">Готовы:</h2>
              <ul className={`${stylesFeed['feed__numbers-list']}`}>
                {allOrdersDoneStatus.map((order: IFeedOrder) => (
                  <li key={order._id} className={`${stylesFeed['feed__numbers-done']} text text_type_digits-default`}>{order.number}</li>
                ))}
              </ul>
            </div>
            <div className={`${stylesFeed['feed__done-container']}`}>
              <h2 className="text text_type_main-medium mt-15 mb-6">В работе:</h2>
              <ul className={`${stylesFeed['feed__numbers-list']}`}>
                {allOrdersPensingStatus.map((order: IFeedOrder) => (
                  <li key={order._id} className={`text text_type_digits-default mb-2`}>{order.number}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
          <p className={`${stylesFeed['feed__total-digits']} text text_type_digits-medium mb-15`}>{total}</p>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p className={`${stylesFeed['feed__total-digits']} text text_type_digits-medium`}>{totalToday}</p>
        </div>
        {currentOrderDetails && (
          <Modal handleCloseModal={handleCloseOrderDetails}>
            <OrderDescription orderData={currentOrderDetails} />
          </Modal>
        )}
      </section>
    )
  }
  else if (error) {
    return (<p className={`${stylesFeed.main__error} text text_type_main-default`}>Произошла ошибка соединения с сервером.</p>)
  }
  else {
    return <Preloader />
  }

}

export default Feed
