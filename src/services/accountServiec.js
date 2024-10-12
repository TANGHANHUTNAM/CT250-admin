import axios from "../utils/axiosCustomize";

export const getAllUserWithFilter = async (query) => {
  return axios.get(`/api/v1/account/all/filter?${query}`);
};
