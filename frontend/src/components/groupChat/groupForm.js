import React from "react";
import GroupTags from "./groupTag";
import CloseIcon from "@mui/icons-material/Close";
import { handleGroupForm } from "../../pages/chatApp/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const GroupForm = () => {
  const dispatch = useDispatch();
  const groupFormFlag = useSelector((state) => state.chats?.groupFlag);
  return (
    <div
      className={`bg-[#15172B] text-white h-full w-full transition-all ease-in-out delay-100 border-r-4  ${
        groupFormFlag ? "block" : "hidden"
      } z-[999] p-4 absolute`}
    >
      <div
        className="flex justify-end w-full text-white px-2 "
        onClick={() => dispatch(handleGroupForm(false))}
      >
        <CloseIcon />
      </div>
      <div>
        <h2 className="text-xl capitalize text-center py-4 mb-4">
          create Chat Group
        </h2>
      </div>
      <GroupTags />
    </div>
  );
};

export default GroupForm;
