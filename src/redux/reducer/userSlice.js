import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  account: {
    id: "",
    avatar: "",
    username: "",
    email: "",
    fullname: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    address: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (_, action) => ({
      isAuth: true,
      account: {
        id: action?.payload?._id,
        avatar: action?.payload?.avatar,
        username: action?.payload?.username,
        email: action?.payload?.email,
        fullname: action?.payload?.fullname,
        birthday: action?.payload?.birthday,
        gender: action?.payload?.gender,
        phoneNumber: action?.payload?.phoneNumber,
        address: action?.payload?.address,
        role: action?.payload?.role,
      },
    }),
    logoutSuccess: () => ({
      isAuth: false,
      account: {
        id: "",
        avatar: "",
        username: "",
        email: "",
        fullname: "",
        birthday: "",
        gender: "",
        phoneNumber: "",
        address: "",
        role: "",
      },
    }),
    updateInformation: (state, action) => ({
      ...state,
      account: {
        id: action?.payload?._id,
        avatar: action?.payload?.avatar,
        username: action?.payload?.username,
        email: action?.payload?.email,
        fullname: action?.payload?.fullname,
        birthday: action?.payload?.birthday,
        gender: action?.payload?.gender,
        phoneNumber: action?.payload?.phoneNumber,
        address: action?.payload?.address,
        role: action?.payload?.role,
      },
    }),
  },
});

export const { loginSuccess, logoutSuccess, updateInformation } =
  userSlice.actions;

export default userSlice.reducer;
