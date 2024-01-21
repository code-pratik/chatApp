import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getUsers = createAsyncThunk("/api/data/users", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/data/users`,
      {
        headers: {
          Authorization: Cookies.get("authToken"),
        },
      }
    );
    return response.data.data.users;
  } catch (error) {
    return error;
  }
});

export const searchUsers = createAsyncThunk(
  "/api/data/searchUser",
  async (searchValue) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/data/searchUser/?search=${searchValue}`,
        {
          headers: {
            Authorization: Cookies.get("authToken"),
          },
        }
      );
      return { data: response?.data?.data.users, flag: searchValue.flag };
    } catch (error) {
      return error;
    }
  }
);

export const createActiveChat = createAsyncThunk(
  "/",
  async ({ data, flag }) => {
    try {
      return { data, flag };
    } catch (error) {
      return error;
    }
  }
);

export const createChat = createAsyncThunk(
  "/api/chat/createChat",
  async (req) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/createChat/${req.id[0]}+${req.id[1]}`,
        {
          users: req.id,
          message: {
            message: req.data,
            createdBy: req.id[0],
            updtaedBy: "",
          },
          createdBy: req.id[0],
          updatedBy: req.id[0],
        },
        {
          headers: {
            Authorization: Cookies.get("authToken"),
          },
        }
      );
    } catch (error) {
      return error;
    }
  }
);

export const createGroupChat = createAsyncThunk(
  "/api/chat/addMessagesGroup",
  async (req) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/chat/addMessagesGroup/${req.chatId}`,
        {
          message: req.data,
          createdBy: req.id,
          updatedBy: "",
        },
        {
          headers: {
            Authorization: Cookies.get("authToken"),
          },
        }
      );
    } catch (error) {
      return error;
    }
  }
);

const chatSlice = createSlice({
  name: "Chat",
  initialState: {
    flag: false,
    personsFlag: false,
    groupFlag: false,
    callData: { data: {}, flag: false },
    chat: [],
    users: [],
    tagUser: [],
    active: [],
    activeChat: {},
    theme: "dark",
    group: false,
    activeGroup: {},
  },
  reducers: {
    setChats: (state, action) => {
      state.chat = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    handelMenu: (state, action) => {
      state.flag = action.payload;
    },
    handelChatMenu: (state, action) => {
      state.personsFlag = action.payload;
    },
    handleGroupForm: (state, action) => {
      state.groupFlag = action.payload;
    },
    handelActiveGroup: (state, action) => {
      state.activeChat = action.payload;
    },
    handelCall: (state, action) => {
      state.callData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.active = action.payload;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        if (action.payload.flag === "tag") {
          state.tagUser = action.payload.data;
        } else {
          state.users = action.payload.data;
        }
      })
      .addCase(createActiveChat.fulfilled, (state, action) => {
        state.activeChat = action.payload.data;
        state.group = action.payload?.flag;
      });
  },
});

export const {
  setChats,
  setTheme,
  handelMenu,
  handelChatMenu,
  handleGroupForm,
  handelCall,
  handelActiveGroup,
} = chatSlice.actions;

export default chatSlice.reducer;
