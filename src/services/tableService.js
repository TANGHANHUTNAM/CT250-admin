import axios from "../utils/axiosCustomize";

export const getAllTableWithFilter = (query) => {
  return axios.get(`/api/v1/table/get?${query}`);
};

export const getStatusTable = () => {
  return axios.get(`/api/v1/table/status/all`);
};

export const createTable = (data) => {
  return axios.post(`/api/v1/table/add`, data);
};

export const updateTable = (id, data) => {
  return axios.put(`/api/v1/table/update/${id}`, data);
};

export const getAllTypeTable = () => {
  return axios.get(`/api/v1/table-type/all`);
};

export const createTypeTable = (data) => {
  return axios.post(`/api/v1/table-type/add`, data);
};
