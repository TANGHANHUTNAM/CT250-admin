import axios from "../utils/axiosCustomize";

export const getAllUserWithFilter = async (query) => {
  return axios.get(`/api/v1/account/all/filter?${query}`);
};

export const deleteUserRoleStaff = async (_id) => {
  return axios.delete(`/api/v1/account/remove/${_id}`);
};

export const createUserRoleStaff = async (data) => {
  return axios.post("/api/v1/account/add", data);
};
