import moment from 'moment';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT2 = 'DD MMMM, YYYY';
export const DATE_FORMAT3 = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT4 = 'DD MMM YYYY';

export const today = moment().format(DATE_FORMAT);
export const yesterday = moment().subtract(1, 'days').format(DATE_FORMAT);
export const tommorow = moment().add(1, 'days').format(DATE_FORMAT);
export const dayAfterTommorow = moment().add(2, 'days').format(DATE_FORMAT);

export const dates = [today, tommorow, dayAfterTommorow];

export const dates2 = [today, tommorow, yesterday]; 
