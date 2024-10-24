export const formatCurrency = (amount, currency = "VND", locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatQuantity = (number, decimalPlaces = 1) => {
  if (number >= 1e9) {
    return (
      (number / 1e9)
        .toFixed(decimalPlaces)
        .replace(new RegExp(`\\.0{1,${decimalPlaces}}$`), "") + "B"
    ); // Tỷ (Billion)
  } else if (number >= 1e6) {
    return (
      (number / 1e6)
        .toFixed(decimalPlaces)
        .replace(new RegExp(`\\.0{1,${decimalPlaces}}$`), "") + "M"
    ); // Triệu (Million)
  } else if (number >= 1e3) {
    return (
      (number / 1e3)
        .toFixed(decimalPlaces)
        .replace(new RegExp(`\\.0{1,${decimalPlaces}}$`), "") + "K"
    ); // Nghìn (Thousand)
  } else {
    return number
      .toFixed(decimalPlaces)
      .replace(new RegExp(`\\.0{1,${decimalPlaces}}$`), ""); // Số nhỏ hơn 1000
  }
};

export const formatAddress = ({
  details = "",
  ward = "",
  district = "",
  province = "",
}) => {
  const parts = [details, ward, district, province]; // Tạo mảng chứa các thành phần của địa chỉ
  return parts.filter((part) => part).join(", "); // Lọc ra các phần không rỗng và nối lại thành chuỗi
};
