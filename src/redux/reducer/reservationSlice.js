import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  data: [],
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    newOrConfirmedReservation: (_, action) => ({
      total: action?.payload?.total ?? 0,
      data: action?.payload?.data ?? [],
    }),
  },
});

export const { newOrConfirmedReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
