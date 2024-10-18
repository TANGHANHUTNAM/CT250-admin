import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  order: { count: 0, data: [] },
  reservation: { count: 0, data: [] },
  income: 0,
  customer: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changedReservation: (state, action) => {
      const newState = _.cloneDeep(state);

      newState.reservation = {
        count: action?.payload?.total ?? 0,
        data: action?.payload?.data ?? [],
      };
      return newState;
    },
    changedOrder: (state, action) => {
      const newState = _.cloneDeep(state);

      newState.order = {
        count: action?.payload?.total ?? 0,
        data: action?.payload?.data ?? [],
      };
      return newState;
    },
    newCustomer: (state, action) => {
      const newState = _.cloneDeep(state);

      newState.customer = action?.payload?.count ?? 0;
      return newState;
    },
    changedIncome: (state, action) => {
      const newState = _.cloneDeep(state);

      newState.income = action?.payload?.total ?? 0;
      return newState;
    },
  },
});

export const { changedReservation, changedOrder, newCustomer, changedIncome } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
