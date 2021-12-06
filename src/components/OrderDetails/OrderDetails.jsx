import done from 'images/done.svg';
import { useEffect, useState } from 'react';
import { postOrder } from 'utils/api';
import PropTypes from 'prop-types';
import OrderDetailsStyles from './OrderDetails.module.css';

function OrderDetails(props) {

  const [orderNum, setOrderNum] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    postOrder(props.arrayOrderId)
      .then((res) => {
        setOrderNum(res.order.number)
      })
      .catch((err) => {
        setError(`Ошибка ${err}`)
      })
  }, [props.arrayOrderId])

  return (
    <div className={`${OrderDetailsStyles.orderDetails} pt-30 pb-30`}>
      <h1 className={`${OrderDetailsStyles.orderDetails__heading} text text_type_digits-large mb-8`}>{orderNum || error}</h1>
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

OrderDetails.propTypes = {
  arrayOrderId: PropTypes.arrayOf(PropTypes.string)
}

export default OrderDetails
