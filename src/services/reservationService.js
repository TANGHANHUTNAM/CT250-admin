import axios from "../utils/axiosCustomize";

const getReservationsByStatus = (status) => {
  return axios.get(`/api/v1/reservation?status=${status}`);
};

const getAvailableTables = () => {
  return axios.get(`/api/v1/table/all/available`);
};

const acceptReservation = (id, data) => {
  return axios.put(`/api/v1/reservation/accept/${id}`, data);
};

const rejectReservation = (id) => {
  return axios.put(`/api/v1/reservation/cancel/${id}`);
};

const completeReservation = (id) => {
  return axios.put(`/api/v1/reservation/complete/${id}`);
};

const getPendingReservationsWithPagination = (page = 1, limit = 10) => {
  return axios.get(`/api/v1/reservation/pending?page=${page}&limit=${limit}`);
};

const getNewAndRecentReservation = (limit = 6) => {
  return axios.get(`/api/v1/reservation/get/new-and-recent-reservation`, {
    params: { limit },
  });
};

export {
  getReservationsByStatus,
  getAvailableTables,
  acceptReservation,
  rejectReservation,
  completeReservation,
  getPendingReservationsWithPagination,
  getNewAndRecentReservation,
};
