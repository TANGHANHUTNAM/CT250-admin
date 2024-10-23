import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  data: [],
  totalPages: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changedPendingOrder: (_, action) => ({
      total: action?.payload?.total ?? 0,
      data: action?.payload?.data ?? [],
      totalPages: action?.payload?.totalPages ?? 0,
    }),
  },
});

export const { changedPendingOrder } = orderSlice.actions;

export default orderSlice.reducer;
