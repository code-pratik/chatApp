import React, { Children } from "react";
import SideMenu from "./sideMenu";
import { Outlet } from "react-router-dom";
import Nav from "./nav";
import { handelCall } from "../pages/chatApp/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import IncomingCallNotification from "../components/Call";

export const Layout = () => {
  const state = useSelector((state) => state);
  return (
    <div className="flex w-full h-screen overflow-hidden ">
      {console.log(state)}
      <SideMenu />
      <div className=" w-[100%] md:w-[78%] lg:w-[82%]  h-full  flex flex-col ">
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};
