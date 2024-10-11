import axios from "../utils/axiosCustomize";

export const getDishesWithPagination = async (query) => {
  const res = await axios.get(`/api/v1/dish?${query}`);
  return res;
};
