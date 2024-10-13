import axios from "../utils/axiosCustomize";

export const getDishesWithPagination = async (query) => {
  const res = await axios.get(`/api/v1/dish?${query}`);
  return res;
};

export const deleteDish = async (id) => {
  const res = await axios.delete(`/api/v1/dish/delete/${id}`);
  return res;
};
