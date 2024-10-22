import axios from "../utils/axiosCustomize";

const getOrdersWIthFilter = ({ status, search, page = 1, limit = 10 }) => {
  return axios.get(`/api/v1/order/get`, {
    params: { status, search, page, limit },
  });
};

const getOrderById = (id) => {
  return axios.get(`/api/v1/order/${id}`);
};

const cancelOrder = (id) => {
  return axios.put(`/api/v1/order/cancel/${id}`);
};

const updateOrderStatus = (id, status) => {
  return axios.put(`/api/v1/order/update/${id}/status/${status}`);
};

const completeOrder = (id) => {
  return axios.put(`/api/v1/order/complete/${id}`);
};

export {
  getOrdersWIthFilter,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
  completeOrder,
};
