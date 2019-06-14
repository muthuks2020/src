import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT2 = 'DD MMMM, YYYY';
export const DATE_FORMAT3 = 'YYYY-MM-DD HH:mm:ss';
export const DATE_IN_MILISECONDS = 'DATE_IN_MILISECONDS';

export default class DateProvider {
  constructor(startDate=null) {
    if(startDate) {
      this.startDate = moment(startDate).format(DATE_FORMAT);
    } else {
      this.startDate = moment().format(DATE_FORMAT);
    }
    
    this.updateOtherDays();
  }

  updateOtherDays() {
    this.startDatePlusOne = moment(this.startDate).add(1, 'days').format(DATE_FORMAT);
    this.startDatePlusTwo = moment(this.startDate).add(2, 'days').format(DATE_FORMAT);
    this.startDateMinusOne = moment(this.startDate).subtract(1, 'days').format(DATE_FORMAT);
  }

  setStartDate(startDate) {
    this.startDate = moment(startDate).format(DATE_FORMAT);
    this.updateOtherDays();
  }

  getToday(format=null) {
    return this.formatDate(this.startDate, format)
  }

  getTommorow(format=null) {
    return this.formatDate(this.startDatePlusOne, format); 
  }

  getDayAfterTommorow(format=null) {
    return this.formatDate(this.startDatePlusTwo, format); 
  }

  getYesterday(format=null) {
    return this.formatDate(this.startDateMinusOne, format); 
  }

  getDatesAsc() {
    return [this.startDate, this.startDatePlusOne, this.startDatePlusTwo];
  }

  getDatesTTY() {
    return [this.startDate, this.startDatePlusOne, this.startDateMinusOne];
  }

  formatDate(date, format) {
    if(format) {
      if(format===DATE_IN_MILISECONDS) {
        return moment.date().valueOf();
      }
      return moment(date).format(format);
    }
    return date;
  }
}
