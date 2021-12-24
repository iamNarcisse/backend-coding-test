import dayjs from 'dayjs';

/*
1. Write a pricing algorithm function that takes in a start DateTime, end DateTime, price per hour and returns the total price for the duration.
2. The pricing algorithm should be able to handle the following :
    a. Overwriting the price per hour for a specific DateTime range
    b. Calculating the price by the minute (to account for times when the total time doesn't add up to a full hour)
    c. The algorithm should be timezone aware
3. The price should be doubled on weekends
4. The end of any given day is 23:59:59 & the start of the next day is 00:00:00
5. The price should be rounded to 2 decimal places
6. You may use the library of your choice for date manipulation but DayJS is recommended
7. Use `ts-node pricing_algo` to run the pricing algorithm
*/

interface DateTimePayload {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour?: number;
  overwritePrice?: OverwritePrice[];
}

interface OverwritePrice {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour: number;
}

/**
 * Checks if today is weekend
 * @returns {boolean} true | false based on the day of the week
 */
export const isWeekend = (date: Date) => {
  switch (dayjs(date).day()) {
    case 0:
    case 6:
      return true;
    default:
      return false;
  }
};

export const pricePerHourToMinutes = (pricePerHour: number) => {
  return pricePerHour / 60;
};

export const getStartDateTimeCost = (payload: DateTimePayload) => {
  const timeInMinutes = dayjs(payload.startDateTime)
    .endOf('day')
    .diff(dayjs(payload.startDateTime), 'minute');

  let price = pricePerHourToMinutes(payload.pricePerHour as number);

  if (isWeekend(payload.startDateTime)) {
    price = price * 2;
  }

  const cost = timeInMinutes * price;

  return Number(cost.toFixed(2));
};

export const getEndDateTimeCost = (payload: DateTimePayload) => {
  const timeInMinutes = dayjs(payload.endDateTime).diff(
    dayjs(payload.endDateTime).startOf('day'),
    'minute'
  );

  let overWriteMins = 0;

  let overWriteCost = 0;

  //Override

  payload.overwritePrice?.forEach((item) => {
    if (
      dayjs(item.startDateTime).isBefore(dayjs(payload.endDateTime)) &&
      dayjs(item.endDateTime).isAfter(dayjs(payload.endDateTime))
    ) {
      overWriteMins = dayjs(payload.endDateTime).diff(dayjs(item.startDateTime), 'minute');

      let price = pricePerHourToMinutes(item.pricePerHour as number);

      if (isWeekend(item.endDateTime)) {
        // price = price * 2;
      }
      overWriteCost = overWriteMins * price;
    }
  });

  const normalMins = timeInMinutes - overWriteMins;

  let price = pricePerHourToMinutes(payload.pricePerHour as number);

  if (isWeekend(payload.endDateTime)) {
    price = price * 2;
  }

  const normalTimeCost = normalMins * price;

  const newCost = normalTimeCost + overWriteCost;

  return Number(newCost.toFixed(2));
};

export const computeRestOfDaysCost = (payload: DateTimePayload) => {
  // Get days between two dateTimes

  let answerCost = 0;
  let nextDateTimeStart = dayjs(payload.startDateTime).endOf('day').add(1, 'second');
  let nextDateTimeEnds = dayjs(nextDateTimeStart).endOf('day');

  const totalMins = dayjs(nextDateTimeEnds).diff(nextDateTimeStart, 'minute');

  let overWriteMins = 0;

  let overWriteCost = 0;

  payload?.overwritePrice?.forEach((item) => {
    if (
      dayjs(item.startDateTime).isAfter(dayjs(nextDateTimeStart)) &&
      dayjs(item.endDateTime).isBefore(dayjs(nextDateTimeEnds))
    ) {
      overWriteMins = dayjs(item.endDateTime).diff(dayjs(item.startDateTime), 'minute');

      let price = pricePerHourToMinutes(item.pricePerHour as number);

      if (isWeekend(item.endDateTime)) {
        // price = price * 2;
      }
      overWriteCost = overWriteMins * price;
    }
  });

  const restOfDayMins = totalMins - overWriteMins;

  let restOfDayPrice = pricePerHourToMinutes(payload.pricePerHour as number);

  if (isWeekend(dayjs(nextDateTimeStart).toDate())) {
    restOfDayPrice = restOfDayPrice * 2;
  }

  const restOfDayCost = restOfDayMins * restOfDayPrice;

  answerCost = restOfDayCost + overWriteCost;

  return {
    cost: Number(answerCost.toFixed(2)),
    startDateTime: nextDateTimeStart,
    endDateTime: nextDateTimeEnds,
  };
};

export const onTheSameDay = (payload: DateTimePayload) => {
  const timeInMinutes = dayjs(payload.endDateTime).diff(dayjs(payload.startDateTime), 'minute');

  let price = pricePerHourToMinutes(payload.pricePerHour as number);

  if (isWeekend(new Date(payload.startDateTime))) {
    price = price * 2;
  }
  return timeInMinutes * price;
};

export const computePrice = (payload: DateTimePayload) => {
  if (dayjs(payload.startDateTime).isSame(dayjs(payload.endDateTime))) {
    throw new Error('Datetime must not be same');
  }

  if (dayjs(payload.startDateTime).isAfter(dayjs(payload.endDateTime))) {
    throw new Error('Start date time  must be in the past');
  }

  // Bokking on THE SAME DAY

  if (dayjs(payload.startDateTime).day() === dayjs(payload.endDateTime).day()) {
    return onTheSameDay(payload);
  }

  const firstDayCost = getStartDateTimeCost(payload);
  const lastDayCost = getEndDateTimeCost(payload);

  let restOfDayCost = 0;

  const numOfDays = dayjs(payload.endDateTime).diff(dayjs(payload.startDateTime), 'days');

  let count = numOfDays;

  while (count > 1) {
    const result = computeRestOfDaysCost(payload);
    payload.startDateTime = result.startDateTime.toDate();
    payload.endDateTime = result.endDateTime.toDate();

    restOfDayCost = restOfDayCost + result.cost;

    count--;
  }

  return Number((firstDayCost + lastDayCost + restOfDayCost).toFixed(2));
};

export const pricingAlgo = (
  startDateTime: Date,
  endDateTime: Date,
  pricePerHour: number,
  overwritePrice?: OverwritePrice[]
): number => {
  const price = computePrice({ startDateTime, endDateTime, pricePerHour, overwritePrice });

  return price;
};

export default pricingAlgo;
const result = pricingAlgo(new Date('2021-11-08T09:24:00'), new Date('2021-11-12T09:24:00'), 10, [
  {
    startDateTime: new Date('2021-11-14T12:00:00'),
    endDateTime: new Date('2021-11-14T14:01:00'),
    pricePerHour: 5,
  },
  {
    startDateTime: new Date('2021-11-15T09:00:00'),
    endDateTime: new Date('2021-11-17T00:00:00'),
    pricePerHour: 15.2,
  },
]);

console.log(result);
