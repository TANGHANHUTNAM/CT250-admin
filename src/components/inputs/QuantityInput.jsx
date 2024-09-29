import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const IS_VALID_QUANTITY = /^([1-9]\d*)$/;

const QuantityInput = ({
  rootClass = "",
  buttonClass = "",
  inputClass = "",
  iconClass = "",
  value = 1,
  max = 50,
  onChange = (quantity) => {}, // Thay đổi do click vào nút tăng/giảm hoặc gõ trực tiếp vào input
  onInputBlur = (quantity) => {}, // Khi blur ra khỏi input
  onButtonClick = (quantity) => {}, // // Khi click vào nút tăng/giảm
  ...inputProps
}) => {
  const [quantity, setQuantity] = useState(value);

  useEffect(() => {
    onChange(quantity);
  }, [quantity]);

  const handleChangeInput = (value) => {
    if (value === "") {
      setQuantity(value);
    } else if (IS_VALID_QUANTITY.test(value)) {
      setQuantity(+value);
    }
  };

  const increaseQuantity = () => {
    if (+quantity < max) {
      setQuantity(+quantity + 1);
      onButtonClick(+quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (+quantity > 1) {
      setQuantity(+quantity - 1);
      onButtonClick(+quantity - 1);
    }
  };

  const handleBlur = (value) => {
    const newQuantity = !IS_VALID_QUANTITY.test(value)
      ? 1
      : +value > max
        ? max
        : +value;

    setQuantity(newQuantity);
    onInputBlur(newQuantity);
  };

  return (
    <div
      className={`flex h-8 flex-nowrap rounded-sm border border-solid border-gray-300 ${rootClass}`}
    >
      <button
        className={`flex w-8 shrink-0 items-center justify-center bg-transparent text-yellow-500 duration-150 hover:bg-tertiary hover:text-primary ${buttonClass}`}
        onClick={() => decreaseQuantity()}
      >
        <FaMinus className={`h-3 w-3 ${iconClass}`} />
      </button>
      <input
        value={quantity}
        onChange={(e) => handleChangeInput(e.target.value)}
        onBlur={(e) => handleBlur(e.target.value)}
        className={`w-12 border-x border-gray-300 bg-transparent text-center text-sm text-primary outline-none ${inputClass}`}
        {...inputProps}
      />
      <button
        className={`flex w-8 shrink-0 items-center justify-center bg-transparent text-yellow-500 duration-150 hover:bg-tertiary hover:text-primary ${buttonClass}`}
        onClick={() => increaseQuantity()}
      >
        <FaPlus className={`h-3 w-3 ${iconClass}`} />
      </button>
    </div>
  );
};

export default QuantityInput;
