export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};

export const centsToDolars = (cents: number): string => {
  const dollars = cents / 100;
  const addDecimal = twoDecimals(dollars);
  return addThousandSeparator(addDecimal);
}

export const twoDecimals = (num: number): string => {
  return num.toFixed(2);
}

export const addThousandSeparator = (num: string): string => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}