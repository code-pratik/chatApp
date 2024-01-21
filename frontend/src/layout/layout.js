import React from "react";
import SideMenu from "./sideMenu";
import { Outlet } from "react-router-dom";
import Nav from "./nav";

export const Layout = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden ">
      <SideMenu />
      <div className=" w-[100%] md:w-[78%] lg:w-[82%]  h-full  flex flex-col ">
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};
