export const formatMoneyToVND = (amount) => {
// Convert the amount to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = amount.toFixed(0).toString().split('.');

  // Add a dot after every 3 digits in the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Combine the formatted integer part with the decimal part (if any)
  const formattedAmount = decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;

  // Add the VND currency symbol
  return `${formattedAmount}`;
};