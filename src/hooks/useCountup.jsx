import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";

export const useCountup = (end) => {
  const countUpRef = useRef(null);
  const { update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end,
    duration: 2,
  });
  useEffect(() => {
    if (countUpRef.current) update(end);
  }, [end, update]);
  return { countUpRef, update };
};

export const useVNDCountup = (end) => {
  const countUpRef = useRef(null);

  const { update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end,
    formattingFn: (value) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  });
  useEffect(() => {
    if (countUpRef.current) update(end);
  }, [end, update]);
  return { countUpRef, update };
};
