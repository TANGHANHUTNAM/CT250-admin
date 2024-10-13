// import { query } from "express";
import axios from "../utils/axiosCustomize";

export const getAllUserWithFilter = async (query) => {
  return axios.get(`/api/v1/account/all/filter?${query}`);
};

export const updateUserInfomation = async (id,data,file) => {
  return axios.put(`/api/v1/account/update/profile/${id}`,data,file);
}
