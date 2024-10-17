import axios from "../utils/axiosCustomize";

export const addCoupon = async (data) => {
  const res = await axios.post(`/api/v1/coupon/add`, data);
  return res;
};

export const updateCoupon = async (id, data) => {
  const res = await axios.put(`/api/v1/coupon/update/${id}`, data);
  return res;
};

export const changeStatusCoupon = async (id, data) => {
  const res = await axios.put(`/api/v1/coupon/active/change/${id}`, data);
  return res;
};

export const getAllCouponWithFilter = async (query) => {
  const res = await axios.get(`/api/v1/coupon/get?${query}`);
  return res;
};
