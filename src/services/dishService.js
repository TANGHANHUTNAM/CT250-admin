import axios from "../utils/axiosCustomize";

export const getDishesByFilter = async (query) => {
  const res = await axios.get(`/api/v1/dish/get?${query}`);
  return res;
};

export const deleteDish = async (id) => {
  const res = await axios.delete(`/api/v1/dish/delete/${id}`);
  return res;
};

export const recoverDish = async (id) => {
  const res = await axios.put(`/api/v1/dish/recover/${id}`);
  return res;
};

export const updateDish = async (id, data) => {
  const res = await axios.put(`/api/v1/dish/update/${id}`, data);
  return res;
};

export const addDish = async (data) => {
  const res = await axios.post(`/api/v1/dish/add`, data);
  return res;
};

export const setAvailabilityDish = async (id, data) => {
  const res = await axios.put(`/api/v1/dish/availability/change/${id}`, data);
  return res;
};
