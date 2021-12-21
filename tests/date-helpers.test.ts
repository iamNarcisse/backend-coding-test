import {
  isWeekend,
  getHourDifference,
  computePriceFromHour,
  getHoursInRange,
} from '../src/pricing_algo';

const params = {
  startDateTime: new Date('2021-12-19T12:00:00'),
  endDateTime: new Date('2021-12-20T00:00:00'),
};

describe('Algo util tests', () => {
  test('Date is weekend', () => {
    expect(isWeekend(new Date())).toBe(false);
  });

  test('Get Hour difference', () => {
    expect(getHourDifference(params)).toBeDefined();
  });

  test('Compute Price from hour provided', () => {
    expect(computePriceFromHour(1, 10)).toBe(10);
  });

  test('Get hour difference', () => {
    expect(
      getHourDifference({
        startDateTime: new Date('2021-12-19T12:01:00'),
        endDateTime: new Date('2021-12-19T12:01:00'),
      })
    ).toEqual(0);
  });

  test('Test Ge hours in range', () => {
    expect(getHoursInRange(params)).toHaveProperty('normalHours', 12);
  });
});
