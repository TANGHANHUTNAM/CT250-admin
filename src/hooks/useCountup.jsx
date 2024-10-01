import { useRef } from "react";
import { useCountUp } from "react-countup";

export const useCountup = (end) => {
  const countUpRef = useRef(null);
  useCountUp({ ref: countUpRef, start: 0, end, duration: 3 });
  return countUpRef;
};

export const useVNDCountup = (end) => {
  const countUpRef = useRef(null);

  useCountUp({
    ref: countUpRef,
    end,
    formattingFn: (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  });

  return countUpRef;
};
