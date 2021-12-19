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

const isWeekend = (date: Date = new Date()) => {
  switch (date.getDate()) {
    case Date.FRIDAY:
    case Date.SATURDAY:
    case Date.SUNDAY:
      return true;
    default:
      return false;
  }
};

const computePriceFromHour = (hour: number, pricePerHour: number) => {
  const fullHours = parseInt(String(hour));
  const partialHour = hour - fullHours;
  const pricePerMinute = (partialHour / 100) * pricePerHour;
  const price = fullHours * pricePerHour + pricePerMinute * 100;

  return Number(price.toFixed(2));
};
const getHourDifference = (startDateTime: Date, endDateTime: Date): number => {
  const hourDiff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
  return hourDiff;
};

const handleOverwritePrice = (arrayList: OverwritePrice[]): OverwritePrice[] | undefined => {
  arrayList.forEach((item: OverwritePrice & { price?: number }) => {
    const price = getPrice(item.startDateTime, item.endDateTime, item.pricePerHour);
    item.price = price;
  });

  return arrayList;
};

const getHoursInRange = (
  startDateTime: Date,
  endDateTime: Date
): { normalHours: number; weekendHours: number } => {
  let numberOfHoursToBeDoubled = 0;

  /**
   * Prevent startDateTime from being after endDateTime
   */
  if (startDateTime.isAfter(endDateTime)) {
    throw new Error(`Start date ${startDateTime} must not before end date ${endDateTime}`);
  }

  // Check if both dates are not weekends
  if (!isWeekend(startDateTime) && !isWeekend(endDateTime)) {
    // Get time differnence
    const hours = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
    return { normalHours: hours, weekendHours: numberOfHoursToBeDoubled };
  }

  // Either of the dates are weekends
  if (isWeekend(startDateTime)) {
    //State date ends
    const startDateEndsConfig = { hour: 23, minute: 59, second: 59 };
    const startDateTimeEnds = Date.parse(startDateTime.toString()).at(startDateEndsConfig as any);
    const hourDiff = getHourDifference(startDateTime, startDateTimeEnds);
    // Price should be doubled since on a weekend
    numberOfHoursToBeDoubled = numberOfHoursToBeDoubled + hourDiff;
  }

  if (isWeekend(endDateTime)) {
    const endDateStartsConfig = { hour: 0, minute: 0, second: 0 };
    const endDateTimeStarts = Date.parse(endDateTime.toString()).at(endDateStartsConfig as any);
    const hourDiff = getHourDifference(endDateTimeStarts, endDateTime);
    // Price should be doubled since on a weekend
    numberOfHoursToBeDoubled = numberOfHoursToBeDoubled + hourDiff;
  }

  // Get time difference
  const timediff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
  return { normalHours: timediff, weekendHours: numberOfHoursToBeDoubled };
};

const getPrice = (startDateTime: Date, endDateTime: Date, pricePerHour: number): number => {
  const { normalHours, weekendHours } = getHoursInRange(startDateTime, endDateTime);
  return (
    computePriceFromHour(normalHours, pricePerHour) +
    computePriceFromHour(weekendHours, pricePerHour)
  );
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
  const price = getPrice(startDateTime, endDateTime, pricePerHour);

  if (overwritePrice && Array.isArray(overwritePrice)) {
    handleOverwritePrice(overwritePrice);
    // console.log(newOverwritePriceList);
  }

  return price;
};

const todayStart = new Date('2021-12-19T12:01:00');
const todayEnd = new Date('2021-12-20T00:00:00');

// new Date('2021-11-13T09:24:00'), new Date('2021-11-15T15:13:00')

const result = pricingAlgo(todayStart, todayEnd, 13, [
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
