import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/api/auth/login`,
      userData
    );
    Cookies.set(
      "authToken",
      response.headers["authorization"],
      24 * 60 * 60 * 1000
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
});

export const updateUserProfileImage = createAsyncThunk(
  "profile/updateProfile",
  async (userData) => {
    try {
      console.log(userData, "adskjahd");
      const response = await axios.patch(
        `http://localhost:8081/api/data/updateProfile/${userData?.id}`,
        userData?.data
      );
      return response.data.data.profileimg.replaceAll("public", "");
    } catch (error) {
      return error;
    }
  }
);

// export const signupUser = createAsyncThunk("aauth/signUp",async(data)=>{

// })
const initialState = {
  user: {},
  profileImg: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = [...state.user, action.payload];
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    }).addCase(updateUserProfileImage.fulfilled, (state, action) => {
      state.profileImg = action.payload;
    });
  },
  // extraReducers: {
  //   [loginUser.fulfilled]: (state, action) => {
  //     state.user = [...state.user, action.payload];
  //   },
  // },
});

export const { logIn } = loginSlice.actions;

export default loginSlice.reducer;
