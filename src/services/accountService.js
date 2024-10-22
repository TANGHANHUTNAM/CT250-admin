import axios from "../utils/axiosCustomize";

export const updateUserInfomation = async (id, data, file) => {
  return axios.put(`/api/v1/account/update/profile/${id}`, data, file);
};

export const getAllUserWithFilter = async (query) => {
  return axios.get(`/api/v1/account/all/filter?${query}`);
};

export const getAllStaff = async () => {
  return axios.get("/api/v1/account/all/staff");
};

export const deleteUserRoleStaff = async (_id) => {
  return axios.delete(`/api/v1/account/remove/${_id}`);
};

export const createUserRoleStaff = async (data) => {
  return axios.post("/api/v1/account/add", data);
};

export const countNewCustomerToday = async () => {
  return axios.get(`/api/v1/account/count/new-customer/today`);
};

export const createMultipleUserRoleStaff = async (data) => {
  return axios.post("/api/v1/account/add/multiples", data);
};
