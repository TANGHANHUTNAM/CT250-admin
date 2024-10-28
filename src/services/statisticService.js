import axios from "../utils/axiosCustomize";

export const getAllTableToTime = () => {
  return axios.get(`/api/v1/statistic/total-reservations`);
};

export const getAllOrderToTime = () => {
  return axios.get(`/api/v1/statistic/total-orders`);
};

export const getAllIncomeToTime = () => {
  return axios.get(`api/v1/statistic/total-incomes`);
};

export const getAllCustomerToTime = () => {
  return axios.get(`/api/v1/statistic/total-customers`);
};

export const getTotalIncomesToMonth = () => {
  return axios.get(`/api/v1/statistic/total-incomes-every-month`);
};

export const getTotalIncomesToCategoryLevel1 = () => {
  return axios.get(`/api/v1/statistic/total-incomes-by-category`);
};

export const getTotalSubcategoryToMonth = () => {
  return axios.get(`/api/v1/statistic/total-incomes-by-subcategory`);
};

export const getTotalStaffCustomerDishes = () => {
  return axios.get(`/api/v1/statistic/total-user-and-dish`);
};
