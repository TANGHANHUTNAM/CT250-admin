import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  data: [],
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    changedPendingReservation: (_, action) => ({
      total: action?.payload?.total ?? 0,
      data: action?.payload?.data ?? [],
    }),
  },
});

export const { changedPendingReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
