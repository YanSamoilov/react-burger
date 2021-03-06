import done from 'images/done.svg';
import { IOrderDetailsProps } from 'services/types/data';
import OrderDetailsStyles from './OrderDetails.module.css';

function OrderDetails({ orderNum, errorOrderNum }: IOrderDetailsProps) {

  return (
    <div className={`${OrderDetailsStyles.orderDetails} pt-30 pb-30`}>
      {orderNum &&
        <h1 className={`${OrderDetailsStyles.orderDetails__heading} text text_type_digits-large mb-8`}>{orderNum}</h1>
      }
      {errorOrderNum &&
        <h1 className={`${OrderDetailsStyles.orderDetails__heading} text text_type_digits-default mb-8`}>{errorOrderNum}</h1>
      }
      <p className={`${OrderDetailsStyles.orderDetails__text} text text_type_main-medium mb-15`}>
        идентификатор заказа
      </p>
      <img src={done} alt="Белая галочка." className={`${OrderDetailsStyles.orderDetails__image}`} />
      <p className={`${OrderDetailsStyles.orderDetails__text} text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${OrderDetailsStyles.orderDetails__text} text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails
