
  export const convertDate = (dateOrder: string) => {
    const time = new Date(Date.parse(dateOrder)).toString().split(' ');
    let dayOrder = '';
    const dateNow = new Date();
    const dateNowInMillis = Date.parse(dateNow.toString());
    const millisPassedToday = (dateNow.getHours() * 3600 + dateNow.getMinutes() * 60 + dateNow.getSeconds()) * 1000;
    const dateOrderInMillis = Date.parse(dateOrder);
    const countDaysAgo = Math.ceil((dateNowInMillis - dateOrderInMillis) / 86400000);

    if (dateNowInMillis - dateOrderInMillis < millisPassedToday) {
      dayOrder = 'Сегодня';
    }
    else if (countDaysAgo === 1) {
      dayOrder = 'Вчера';
    }
    else if (1 < countDaysAgo &&  countDaysAgo < 5) {
      dayOrder = `${countDaysAgo} дня назад`;
    }
    else {
      dayOrder = `${countDaysAgo} дней назад`;
    }
    return `${dayOrder} ${time[4].slice(0, 5)} i-GMT+3`;
  }
