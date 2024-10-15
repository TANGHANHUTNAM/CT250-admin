import axios from "../utils/axiosCustomize";

export const getAllCagegory = async () => {
  const res = await axios.get(`/api/v1/category/all`);
  return res;
};

export const getAllCategoryLevel2ByLevel1 = async (id) => {
  const res = await axios.get(`/api/v1/category/get/${id}`);
  return res;
};
