import axios from "../utils/axiosCustomize";

export const getAllContactsPending = (page, limit) => {
  return axios.get(`/api/v1/contact/pending?page=${page}&limit=${limit}`);
};

export const getAllContactsCompleted = (page, limit) => {
  return axios.get(`/api/v1/contact/completed?page=${page}&limit=${limit}`);
};

export const deleteContactService = (id) => {
  return axios.delete(`/api/v1/contact/reject/${id}`);
};

export const replyContactService = (id, data) => {
  return axios.put(`/api/v1/contact/reply/${id}`, data);
};
