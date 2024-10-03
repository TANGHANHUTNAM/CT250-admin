import axios from "../utils/axiosCustomize";

const getReservationsByStatus = (status) => {
  return axios.get(`/api/v1/reservation?status=${status}`);
};

export { getReservationsByStatus };
