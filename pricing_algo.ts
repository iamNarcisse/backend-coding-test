require('datejs');

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

/**
 * Checks if today is weekend
 * @returns {boolean} true | false based on the day of the week
 */

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

const isWeekend = () => {
  switch (new Date().getDay()) {
    case Date.FRIDAY:
    case Date.SATURDAY:
    case Date.SUNDAY:
      return true;
    default:
      return false;
  }
};

const handleOverwritePrice = (arrayList?: OverwritePrice[]): OverwritePrice[] | undefined => {
  if (!arrayList || !Array.isArray(arrayList)) {
    return;
  }

  arrayList.forEach((item) => {
    const hours = getHoursInRange(item.startDateTime, item.endDateTime);
    const price = getPriceFromHour(hours, item.pricePerHour);
    item.pricePerHour = price;
  });

  return arrayList;
};
const getHoursInRange = (startDateTime: Date, endDateTime: Date): number => {
  /**
   * Prevent startDateTime from being after endDateTime
   */
  if (startDateTime.isAfter(endDateTime)) {
    throw new Error(`Start date ${startDateTime} must not before end date ${endDateTime}`);
  }

  // Get time differnence
  const timediff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
  return timediff;
};

const getPriceFromHour = (hour: number, pricePerHour: number): number => {
  // Check if hour contains fraction

  const fullHours = parseInt(String(hour));
  const partialHour = hour - fullHours;
  const pricePerMinute = (partialHour / 100) * pricePerHour;
  const price = fullHours * pricePerHour + pricePerMinute * 100;

  if (!isWeekend()) {
    return Number(price.toFixed(2));
  }

  return Number(price.toFixed(2)) * 2;
};

interface OverwritePrice {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour: number;
}

const pricingAlgo = (
  startDateTime: Date,
  endDateTime: Date,
  pricePerHour: number,
  overwritePrice?: OverwritePrice[]
): number => {
  const hours = getHoursInRange(startDateTime, endDateTime);

  const price = getPriceFromHour(hours, pricePerHour);

  handleOverwritePrice(overwritePrice);

  return price;
};

const todayStart = new Date('2021-12-19T12:01:00');
const todayEnd = new Date('2021-12-20T00:00:00');

// new Date('2021-11-13T09:24:00'), new Date('2021-11-15T15:13:00')

pricingAlgo(todayStart, todayEnd, 13, [
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
