import axios from "../utils/axiosCustomize";

export const getAllCagegory = async () => {
  const res = await axios.get(`/api/v1/category/all`);
  return res;
};

export const getAllCategoryLevel2ByLevel1 = async (id) => {
  const res = await axios.get(`/api/v1/category/get/${id}`);
  return res;
};

export const createCategory = async (data) => {
  const res = await axios.post(`/api/v1/category/add`, data);
  return res;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`/api/v1/category/delete/${id}`);
  return res;
};

export const updateCategory = async (id, data) => {
  const res = await axios.put(`/api/v1/category/update/${id}`, data);
  return res;
};
