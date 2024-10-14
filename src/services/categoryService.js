import axios from "../utils/axiosCustomize";

export const getAllCagegory = async () => {
  const res = await axios.get(`/api/v1/category/all`);
  return res;
};
