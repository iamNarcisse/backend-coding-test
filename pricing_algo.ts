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
6. Use `ts-node pricing_algo` to run the pricing algorithm
*/

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
  let price = 0;
  
  console.log(price);
  return price;
};

pricingAlgo(new Date('2021-11-13T09:24:00'), new Date('2021-11-15T15:13:00'), 13, [
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
