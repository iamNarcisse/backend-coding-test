import { isWeekend, getHourDifference } from '../pricing_algo';

const params = {
  startDateTime: new Date('2021-12-19T12:01:00'),
  endDateTime: new Date('2021-12-20T00:00:00'),
};

test('Date is weekend', async () => {
  expect(isWeekend(new Date())).toBe(false);
});

test('Get Hour difference', async () => {
  expect(getHourDifference(params.startDateTime, params.endDateTime)).toBeDefined();
});
