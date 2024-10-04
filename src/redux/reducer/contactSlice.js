import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllContactsPending,
  getAllContactsCompleted,
} from "../../services/contactService";

export const fetchContactPending = createAsyncThunk(
  "contact/fetchContactPending",
  async (param) => {
    const response = await getAllContactsPending(param.page, param.limit);
    return response;
  }
);
export const fetchContactCompleted = createAsyncThunk(
  "contact/fetchContactCompleted",
  async (param) => {
    const response = await getAllContactsCompleted(param.page, param.limit);
    return response;
  }
);

const initialState = {
  contactPending: [],
  contactCompleted: [],
  totalContactPending: 0,
  totalContactCompleted: 0,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContactPending.fulfilled, (state, { payload }) => {
      state.contactPending = payload.DT.data;
      state.totalContactPending = payload.DT.totalContacts;
    });
    builder.addCase(fetchContactCompleted.fulfilled, (state, { payload }) => {
      state.contactCompleted = payload.DT.data;
      state.totalContactCompleted = payload.DT.totalContacts;
    });
  },
});

export const {} = contactSlice.actions;

export default contactSlice.reducer;
