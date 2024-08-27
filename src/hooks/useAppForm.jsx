import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useAppForm = (schema, defaultValues = {}, options) => {
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues,
    ...options,
  });

  return form;
};

export default useAppForm;