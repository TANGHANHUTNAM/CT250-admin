import axios from "../utils/axiosCustomize";

export const uploadImageService = (data) => {
  return axios.post("/api/v1/news/upload-image", data);
};

export const createNewsService = (data) => {
  return axios.post("/api/v1/news/add", data);
};

export const getAllNewsService = (query) => {
  return axios.get(`/api/v1/news/all?${query}`);
};

export const changeStatusNewsService = (id, data) => {
  return axios.put(`/api/v1/news/published/change/${id}`, data);
};

export const updateNewsService = (id, data) => {
  return axios.put(`/api/v1/news/update/${id}`, data);
};
