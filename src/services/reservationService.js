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

export {
  getReservationsByStatus,
  getAvailableTables,
  acceptReservation,
  rejectReservation,
  completeReservation,
};
