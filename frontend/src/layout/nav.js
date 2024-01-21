import React, { useEffect } from "react";
import {
  AddOutlined as AddOutlinedIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  handelChatMenu,
  handelMenu,
  handleGroupForm,
} from "../pages/chatApp/chatSlice";

const Nav = () => {
  const personsFlag = useSelector((state) => state.chats?.personsFlag);
  const data = useSelector((state) => state?.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(handelMenu(false));
    dispatch(handelChatMenu(false));
  }, []);

  const handelChatMenuState = () => {
    dispatch(handelChatMenu(!personsFlag));
    dispatch(handelMenu(false));
  };

  return (
    <div className="h-[10%] box-borde  bg-[#F5F5F5] dark:bg-[#15172B] flex items-center justify-between px-4 py-2 shadow-sm">
      <div className="text-2xl dark:text-white hidden md:flex">
        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>ChatApp</span>
      </div>
      <div
        className="text-2xl text-white md:hidden cursor-pointer"
        onClick={() => {
          dispatch(handelChatMenu(false));
          dispatch(handelMenu(true));
        }}
      >
        <MenuIcon sx={{ fontSize: "30px" }} />
      </div>
      <button
        className="hidden md:flex md:w-[30%] justify-center items-center text-white bg-[#44337A] rounded-full px-4 py-2"
        onClick={() => dispatch(handleGroupForm(true))}
      >
        Create Group
        <AddOutlinedIcon
          sx={{ width: "30px", height: "30px", marginLeft: "5px" }}
        />
      </button>
      <div className="bg-[#44337A] text-white p-2 md:hidden px-4 rounded-full">
        <button onClick={handelChatMenuState}>Persons</button>
      </div>
    </div>
  );
};

export default React.memo(Nav);
