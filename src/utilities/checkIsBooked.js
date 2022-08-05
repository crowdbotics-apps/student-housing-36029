import moment from 'moment';

export const checkIsBooked = (bookingPeriod, selectedDate) => {
  let isBooked = false;
  const compareDateFrom = moment(selectedDate.from);
  const compareDateTo = moment(selectedDate.to);

  bookingPeriod.forEach((tempBookedDate) => {
    const startDate = moment(new Date(tempBookedDate.from), 'YYYY-MM-DD');
    const endDate = moment(new Date(tempBookedDate.to), 'YYYY-MM-DD');
    if (
      compareDateFrom.isBetween(startDate, endDate) ||
      compareDateTo.isBetween(startDate, endDate) ||
      compareDateFrom.isSame(startDate, 'days') ||
      compareDateFrom.isSame(endDate, 'days') ||
      compareDateTo.isSame(startDate, 'days') ||
      compareDateTo.isSame(endDate, 'days') ||
      (compareDateFrom.isBefore(startDate, 'days') &&
        compareDateTo.isAfter(endDate, 'days'))
    ) {
      isBooked = true;
    }
  });
  return isBooked;
};
