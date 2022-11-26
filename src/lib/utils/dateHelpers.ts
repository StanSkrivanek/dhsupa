import { isBefore, format } from 'date-fns';
// https://date-fns.org/docs/Getting-Started
/**
 * Returns a date formatted as a string
 * @param {string} date - Date to format
 * @returns {string} - Formatted date
 */
export const today = format(new Date(), 'yyyy-MM-dd');

/**
 * function takes date format yyyy-mm-dd and returns dd-mm-yyyy
 * @param {string} myDate
 * @returns {string} dd-mm-yyyy
 */

export const convertDate = (myDate: string) => {
  const [year, month, day] = splitDate(myDate);
  return `${day}/${month}/${year}`;
};

/**
 * determines if a date is before today
 * @param {string} myDate
 * @returns {boolean}
 */
export const isLate = (myDate: string): boolean => {
  const [year, month, day] = splitDate(myDate);
  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();
  return isBefore(dueDate, today);
};

/**
 * takes a date in format yyyy-mm-dd and returns an array
 * @param {string} myDate
 * @returns {Array} [yyyy, mm, dd]
 */
export const splitDate = (myDate: string): Array<string> => {
  return myDate.split('-');
};
