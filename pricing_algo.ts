require('datejs');
import moment from 'moment';

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
}

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

/**
 * Updates the pricePerHour based on a specific dateTime range
 * @param startDateTime
 * @param endDateTime
 * @returns {number} newPricePerHour based on a specific DateTime range
 */
const getPricePerHour = (
  payload: DateTimePayload & { overwritePrice: OverwritePrice[] }
): number => {
  let pricePerHour = 0;

  // Strictly falls within the daterange
  payload.overwritePrice.forEach((item) => {
    if (
      payload.startDateTime.getTime() >= item.startDateTime.getTime() &&
      payload.endDateTime.getTime() <= item.endDateTime.getTime()
    ) {
      pricePerHour = item.pricePerHour;
    }
  });

  if (!pricePerHour) {
    // return original pricePerHour
    return payload.pricePerHour as number;
  }

  // return new price per hour
  return pricePerHour;
};

/**
 * Checks if today is weekend
 * @returns {boolean} true | false based on the day of the week
 */
export const isWeekend = (date: Date = new Date()) => {
  switch (date.getDay()) {
    case Date.FRIDAY:
    case Date.SATURDAY:
    case Date.SUNDAY:
      return true;
    default:
      return false;
  }
};

/**
 *
 * @param date {Date}
 * @returns {number} - Day of the week
 */

export const getDayFromDateTime = (date: Date) => {
  return new Date(date).getDay();
};

export const computePriceFromHour = (hour: number, pricePerHour: number) => {
  const fullHours = parseInt(String(hour));
  const partialHour = hour - fullHours;
  const pricePerMinute = (partialHour / 100) * pricePerHour;
  const price = fullHours * pricePerHour + pricePerMinute * 100;

  return Number(price.toFixed(2));
};

/**
 *
 * @param startDateTime
 * @param endDateTime
 * @returns {number} - Hours in between two dates
 */

export const getHourDifference = ({ startDateTime, endDateTime }: DateTimePayload): number => {
  const hourDiff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
  return hourDiff;
};

const timezoneAware = (date: Date | string) => {
  const dateTime = moment(date).format('YYYY-MM-DDTHH:mm:ss');
  return new Date(dateTime).getTime();
};

/**
 *
 * @param param - An object containing the startDateTime and endDateTime
 * @returns {object} Containing the normalHours and weekendHours computed from a date range
 */
export const getHoursInRange = ({
  startDateTime,
  endDateTime,
}: DateTimePayload): { normalHours: number; weekendHours: number } => {
  let weekendHours = 0;

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
    return { normalHours: hours, weekendHours };
  }

  // Booking is on the same date and date falls on weekend
  if (getDayFromDateTime(startDateTime) === getDayFromDateTime(endDateTime)) {
    const hours = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
    return { normalHours: hours, weekendHours: hours };
  }

  // Either of the dates is weekend
  if (isWeekend(startDateTime)) {
    const startDateEndsConfig = { hour: 23, minute: 59, second: 59 };
    const startDateTimeEnds = Date.parse(startDateTime.toString()).at(startDateEndsConfig as any);
    const hourDiff = getHourDifference({ startDateTime, endDateTime: startDateTimeEnds });

    // Computes weekend hours
    weekendHours = weekendHours + hourDiff;
  }

  if (isWeekend(endDateTime)) {
    const endDateStartsConfig = { hour: 0, minute: 0, second: 0 };
    const endDateTimeStarts = Date.parse(endDateTime.toString()).at(endDateStartsConfig as any);
    const hourDiff = getHourDifference({ startDateTime: endDateTimeStarts, endDateTime });

    // Computes weekend hours
    weekendHours = weekendHours + hourDiff;
  }

  //Compute hours in a saturday
  if (
    getDayFromDateTime(startDateTime) === Date.FRIDAY &&
    getDayFromDateTime(endDateTime) === Date.SUNDAY
  ) {
    const dayStarts = new Date().at({ hour: 0, minute: 0, second: 0 } as any);
    const dayEnds = new Date().at({ hour: 23, minute: 59, second: 59 } as any);
    const saturdayHours = getHourDifference({ startDateTime: dayEnds, endDateTime: dayStarts });
    weekendHours = weekendHours + saturdayHours;
  }

  // Get time difference
  const normalHours =
    Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
  return { normalHours, weekendHours };
};

/**
 *
 * @param startDateTime - {Date}
 * @param endDateTime - {Date}
 * @param pricePerHour - {number}
 * @returns {number} Price for a given startDateTime, endDateTime et pricePerHour
 */

const getPrice = (startDateTime: Date, endDateTime: Date, pricePerHour: number): number => {
  const { normalHours, weekendHours } = getHoursInRange({ startDateTime, endDateTime });

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

export const pricingAlgo = (
  startDateTime: Date,
  endDateTime: Date,
  pricePerHour: number,
  overwritePrice?: OverwritePrice[]
): number => {
  let perHourCharge = pricePerHour;
  if (overwritePrice && Array.isArray(overwritePrice) && overwritePrice.length) {
    perHourCharge = getPricePerHour({ startDateTime, endDateTime, pricePerHour, overwritePrice });
  }

  const price = getPrice(startDateTime, endDateTime, perHourCharge);

  return price;
};

const result = pricingAlgo(new Date('2021-11-13T09:24:00'), new Date('2021-11-15T15:13:00'), 10, [
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

export default pricingAlgo;
