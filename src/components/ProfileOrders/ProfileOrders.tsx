import Modal from "components/Modal/Modal";
import OrderDescription from "components/OrderDescription/OrderDescription";
import OrdersList from "components/OrdersList/OrdersList";
import Preloader from "components/Preloader/Preloader";
import ProfileNav from "components/ProfileNav/ProfileNav";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { removeCurrentOrderDetails } from "services/actions/orderDetails";
import { wsConnectionStartClosed, wsConnectionStartWithAuth } from "services/actions/wsActions";
import { useAppDispatch, useAppSelector } from "services/types/hooks";
import Styles from './ProfileOrders.module.css';


function ProfileOrders() {

  const dispatch = useAppDispatch();
  const { orders, wsConnected, error } = useAppSelector(state => state.wsReducer);
  const { currentOrderDetails } = useAppSelector(state => state.orderDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(wsConnectionStartWithAuth());
    return () => { dispatch(wsConnectionStartClosed()) }
  }, [dispatch])

    //Закрыть модальное окно.
    const handleCloseOrderDetails = () => {
      dispatch(removeCurrentOrderDetails());
      history.replace('/profile/orders');
    }

  if (wsConnected && !error && orders) {
    return (
      <section className={`${Styles.profile}`}>
        <div className={`${Styles['profile__nav-container']}`}>
          <ProfileNav />
        </div>
        <OrdersList allOrders={orders.slice().reverse()} />
        {currentOrderDetails && (
          <Modal handleCloseModal={handleCloseOrderDetails}>
            <OrderDescription orderData={currentOrderDetails} />
          </Modal>
        )}
      </section>
    )
  }
  else if (error) {
    return (<p className={`${Styles['profile__main-error']} text text_type_main-default`}>Произошла ошибка соединения с сервером.</p>)
  }
  else {
    return <Preloader />
  }

}

export default ProfileOrders;
