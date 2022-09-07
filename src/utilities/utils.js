export const isImage = (filename) => { 
    var parts = filename.split('.');
    const ext = parts[parts.length - 1];
    return (
        ext?.toLowerCase() === 'jpg' ||
        ext?.toLowerCase() === 'png' ||
        ext?.toLowerCase() === 'jpeg' ||
        ext?.toLowerCase() === 'gif'
    )
 }


 export const totalPrice = (type, price, selectedDays) => {
    switch (type) {
      case 'Day':
        return Math.ceil(price * selectedDays);
      case 'Week':
        return Math.ceil((price / 7) * selectedDays);
      case 'Month':
        return Math.ceil((price / 30) * selectedDays);
      case 'Year':
        return Math.ceil((price / 365) * selectedDays);
      default:
        return Math.ceil(price);
    }
  };
  
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



export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function toQueryString(arr=[]) {
  return arr.length>0 ? arr.join(',') : null;
}
export function timeInWords(date) {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'MMM, D',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MMM, D'
});
;
}
export const truncateText = (text, len) => {
  return text && text.length > len ? `${text.slice(0,len-3)}...` : text
}

export const getChatChannel = (ownerId, studentID) => {
  return `student_housing_${ownerId}_${studentID}`;
};
