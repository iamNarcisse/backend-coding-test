"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricingAlgo = exports.getHoursInRange = exports.getHourDifference = exports.computePriceFromHour = exports.getDayFromDateTime = exports.isWeekend = void 0;
require('datejs');
const moment_1 = __importDefault(require("moment"));
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
/**
 * Updates the pricePerHour based on a specific dateTime range
 * @param startDateTime
 * @param endDateTime
 * @returns {number} newPricePerHour based on a specific DateTime range
 */
const getPricePerHour = (payload) => {
    let pricePerHour = 0;
    // Strictly falls within the daterange
    payload.overwritePrice.forEach((item) => {
        if (payload.startDateTime.getTime() >= item.startDateTime.getTime() &&
            payload.endDateTime.getTime() <= item.endDateTime.getTime()) {
            pricePerHour = item.pricePerHour;
        }
    });
    if (!pricePerHour) {
        // return original pricePerHour
        return payload.pricePerHour;
    }
    // return new price per hour
    return pricePerHour;
};
/**
 * Checks if today is weekend
 * @returns {boolean} true | false based on the day of the week
 */
const isWeekend = (date = new Date()) => {
    switch (date.getDay()) {
        case Date.FRIDAY:
        case Date.SATURDAY:
        case Date.SUNDAY:
            return true;
        default:
            return false;
    }
};
exports.isWeekend = isWeekend;
/**
 *
 * @param date {Date}
 * @returns {number} - Day of the week
 */
const getDayFromDateTime = (date) => {
    return new Date(date).getDay();
};
exports.getDayFromDateTime = getDayFromDateTime;
const computePriceFromHour = (hour, pricePerHour) => {
    const fullHours = parseInt(String(hour));
    const partialHour = hour - fullHours;
    const pricePerMinute = (partialHour / 100) * pricePerHour;
    const price = fullHours * pricePerHour + pricePerMinute * 100;
    return Number(price.toFixed(2));
};
exports.computePriceFromHour = computePriceFromHour;
/**
 *
 * @param startDateTime
 * @param endDateTime
 * @returns {number} - Hours in between two dates
 */
const getHourDifference = ({ startDateTime, endDateTime }) => {
    const hourDiff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
    return hourDiff;
};
exports.getHourDifference = getHourDifference;
const timezoneAware = (date) => {
    const dateTime = (0, moment_1.default)(date).format('YYYY-MM-DDTHH:mm:ss');
    return new Date(dateTime).getTime();
};
/**
 *
 * @param param - An object containing the startDateTime and endDateTime
 * @returns {object} Containing the normalHours and weekendHours computed from a date range
 */
const getHoursInRange = ({ startDateTime, endDateTime, }) => {
    let weekendHours = 0;
    /**
     * Prevent startDateTime from being after endDateTime
     */
    if (startDateTime.isAfter(endDateTime)) {
        throw new Error(`Start date ${startDateTime} must not before end date ${endDateTime}`);
    }
    // Check if both dates are not weekends
    if (!(0, exports.isWeekend)(startDateTime) && !(0, exports.isWeekend)(endDateTime)) {
        // Get time differnence
        const hours = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
        return { normalHours: hours, weekendHours };
    }
    // Booking is on the same date and date falls on weekend
    if ((0, exports.getDayFromDateTime)(startDateTime) === (0, exports.getDayFromDateTime)(endDateTime)) {
        const hours = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
        return { normalHours: hours, weekendHours: hours };
    }
    // Either of the dates is weekend
    if ((0, exports.isWeekend)(startDateTime)) {
        const startDateEndsConfig = { hour: 23, minute: 59, second: 59 };
        const startDateTimeEnds = Date.parse(startDateTime.toString()).at(startDateEndsConfig);
        const hourDiff = (0, exports.getHourDifference)({ startDateTime, endDateTime: startDateTimeEnds });
        // Computes weekend hours
        weekendHours = weekendHours + hourDiff;
    }
    if ((0, exports.isWeekend)(endDateTime)) {
        const endDateStartsConfig = { hour: 0, minute: 0, second: 0 };
        const endDateTimeStarts = Date.parse(endDateTime.toString()).at(endDateStartsConfig);
        const hourDiff = (0, exports.getHourDifference)({ startDateTime: endDateTimeStarts, endDateTime });
        // Computes weekend hours
        weekendHours = weekendHours + hourDiff;
    }
    //Compute hours in a saturday
    if ((0, exports.getDayFromDateTime)(startDateTime) === Date.FRIDAY &&
        (0, exports.getDayFromDateTime)(endDateTime) === Date.SUNDAY) {
        const dayStarts = new Date().at({ hour: 0, minute: 0, second: 0 });
        const dayEnds = new Date().at({ hour: 23, minute: 59, second: 59 });
        const saturdayHours = (0, exports.getHourDifference)({ startDateTime: dayEnds, endDateTime: dayStarts });
        weekendHours = weekendHours + saturdayHours;
    }
    // Get time difference
    const normalHours = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / HOUR_IN_MILLISECONDS;
    return { normalHours, weekendHours };
};
exports.getHoursInRange = getHoursInRange;
/**
 *
 * @param startDateTime - {Date}
 * @param endDateTime - {Date}
 * @param pricePerHour - {number}
 * @returns {number} Price for a given startDateTime, endDateTime et pricePerHour
 */
const getPrice = (startDateTime, endDateTime, pricePerHour) => {
    const { normalHours, weekendHours } = (0, exports.getHoursInRange)({ startDateTime, endDateTime });
    return ((0, exports.computePriceFromHour)(normalHours, pricePerHour) +
        (0, exports.computePriceFromHour)(weekendHours, pricePerHour));
};
const pricingAlgo = (startDateTime, endDateTime, pricePerHour, overwritePrice) => {
    let perHourCharge = pricePerHour;
    if (overwritePrice && Array.isArray(overwritePrice) && overwritePrice.length) {
        perHourCharge = getPricePerHour({ startDateTime, endDateTime, pricePerHour, overwritePrice });
    }
    const price = getPrice(startDateTime, endDateTime, perHourCharge);
    return price;
};
exports.pricingAlgo = pricingAlgo;
const result = (0, exports.pricingAlgo)(new Date('2021-11-13T09:24:00'), new Date('2021-11-15T15:13:00'), 10, [
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
exports.default = exports.pricingAlgo;
//# sourceMappingURL=pricing_algo.js.map