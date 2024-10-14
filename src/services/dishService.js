import axios from "../utils/axiosCustomize";

export const getDishesByFilter = async (query) => {
  const res = await axios.get(`/api/v1/dish/get?${query}`);
  return res;
};

export const deleteDish = async (id) => {
  const res = await axios.delete(`/api/v1/dish/delete/${id}`);
  return res;
};
