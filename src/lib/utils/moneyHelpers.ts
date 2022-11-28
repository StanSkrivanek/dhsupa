/**
 * takes all line items and returns the total
 * @param {array|undefined} lineItems
 * @returns {number}
 */
export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};

/**
 * takes a number and returns a string with the currency format (e.g. $1,000.00)
 * @param {number} cents
 * @returns {string}
 */
export const centsToDollars = (cents: number): string => {
  const dollars = cents / 100;
  const addDecimal = twoDecimals(dollars);
  return addThousandSeparator(addDecimal);
};

/**
 * takes a number and returns a string with two decimal places
 * @param {number} num
 * @returns {string}
 */
export const twoDecimals = (num: number): string => {
  return num.toFixed(2);
};

/**
 * take a number as string and returns a string with a comma separator
 * @param {string} num
 * @returns {string}
 *
 */

export const addThousandSeparator = (num: string): string => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * takes all invoices objects and returns the total
 * @param {Invoice} invoices
 * @returns {number}
 */
export const sumInvoices = (invoices: Invoice[] | undefined): number => {
  if (!invoices) return 0;
  return invoices.reduce((prevValue, curValue) => prevValue + sumLineItems(curValue.lineItems), 0);
};
/**
 * convert amount in decimal format to cents
 * @param {number} dollars
 * @returns {number}
 */
export const dollarsToCents = (dollars: number): number => {
  return dollars * 100;
};

/**
 * takes lineItems nad discount and returns the invoice total
 * @param {Array | undefined} lineItems
 * @param {number | undefined} discount
 * @returns {number}
 */

export const invoiceTotal = (
  lineItems: LineItem[] | undefined,
  discount: number | undefined
): number => {
  const lineItemsSum = sumLineItems(lineItems);
  if (discount) {
    const invoiceDiscount = lineItemsSum * (discount / 100);
    return lineItemsSum - invoiceDiscount;
  }
  return lineItemsSum;
};
