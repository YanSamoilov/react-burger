import OrderFeed from "components/OrderFeed/OrderFeed";
import { Link, useLocation } from "react-router-dom";
import { addCurrentOrderDetails } from "services/actions/orderDetails";
import { IAllOrdersData, IFeedOrder } from "services/types/data";
import { useAppDispatch } from "services/types/hooks";
import { v4 as uuidv4 } from 'uuid';
import stylesOrdersList from "./OrdersList.module.css";


function OrdersList({ allOrders }: IAllOrdersData) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const path = location.pathname === '/feed' ? '/feed' : '/profile/orders';

  //Открыть модальное окно с деталями заказа.
  const handleOpenOrderDetails = (orderData: IFeedOrder) => {
    dispatch(addCurrentOrderDetails(orderData));
  }

  //Рендер карточек заказов.
  const renderAllOrders = (orderData: IFeedOrder) => (
    <li key={uuidv4()} onClick={() => handleOpenOrderDetails(orderData)} className={`${stylesOrdersList['ordersList__order-list']}`}>
      <Link className={`${stylesOrdersList['ordersList__link']}`} to={{
        pathname: `${path}/${orderData._id}`,
        state: { background: location }
      }}>
        <OrderFeed orderData={orderData} />
      </Link>
    </li>
  )

  return (
    <ul className={`${stylesOrdersList['ordersList__orders-container']}`}>
      {allOrders.map(renderAllOrders)}
    </ul>
  )
}

export default OrdersList
