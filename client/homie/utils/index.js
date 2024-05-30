import AsyncStorage from "@react-native-async-storage/async-storage";
export const formatMoneyToVND = (amount) => {
  // Convert the amount to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = amount.toFixed(0).toString().split(".");

  // Add a dot after every 3 digits in the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Combine the formatted integer part with the decimal part (if any)
  const formattedAmount = decimalPart
    ? `${formattedIntegerPart},${decimalPart}`
    : formattedIntegerPart;

  // Add the VND currency symbol
  return `${formattedAmount}`;
};

export const getJwtToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    return token.slice(1, -1);
  } catch (error) {
    console.error("Error fetching token: ", error);
  }
};

const convertYYYYMMDDtoDDMMYYYY = (dayString) => {
  const [year, month, day] = dayString.split("-");
  return `${day}/${month}/${year}`;
};

export const formatDate = (dateString) => {
  const dayString = convertYYYYMMDDtoDDMMYYYY(dateString.slice(0, 10));
  //Get the day today
  const today = new Date();
  const todayString = convertYYYYMMDDtoDDMMYYYY(
    today.toISOString().slice(0, 10)
  );
  if (dayString === todayString) {
    return "Hôm nay";
  } else {
    return dayString;
  }
};
