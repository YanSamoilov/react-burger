import done from '../../images/done.svg';
import OrderDetailsStyles from './OrderDetails.module.css';

function OrderDetails() {

  return (
    <div className={`${OrderDetailsStyles.orderDetails} pt-30 pb-30`}>
      <h1 className={`${OrderDetailsStyles.orderDetails__heading} text text_type_digits-large mb-8`}>034536</h1>
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
