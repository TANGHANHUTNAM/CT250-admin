import { useEffect, useState } from "react";

const useFormatPrice = (value) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
    setFormattedValue(formatted);
  }, [value]);

  return formattedValue;
};

export default useFormatPrice;
