import React, { useEffect, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import InfoCard from "../components/sidebar/infoCard";
import { sideInfo, sideNavigationBtnData } from "./data/sidebar";
import Btns from "../components/sidebar/btns";
import { useDispatch, useSelector } from "react-redux";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { updateUserProfileImage } from "../pages/Login/loginSlice";
import { handelMenu, handleGroupForm } from "../pages/chatApp/chatSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ExitToAppOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const SideMenu = () => {
  const data = useSelector((state) => state.user.user);
  const menuFlag = useSelector((state) => state.chats?.flag);
  const navigate = useNavigate();
  const profileImage = useSelector((state) => state.user.profileImg);
  const dispatch = useDispatch();

  const imageUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(updateUserProfileImage({ id: data["_id"], data: formData }));
  };

  const theme = useSelector((state) => state.chats?.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  const handelMenuState = () => {
    dispatch(handelMenu(false));
  };
  const handleLogout = () => {
    Cookies.remove("authToken", { path: "" });
    navigate("/");
  };
  useEffect(() => {
    dispatch(handelMenu(false));
  }, []);

  return (
    <div
      className={`h-[100%] lg:w-[20%] md:w-[23%] sm:w-[40%] xl:w-[18%] border-r-2  bg-[#15172B] py-4  flex-col gap-4 md:flex ${
        menuFlag
          ? "xs:absolute z-[99999] md:static left-[0px] transition-all ease-in-out delay-400"
          : "xs:absolute md:static -left-[300px] z-[99999] transition-all ease-out "
      }`}
    >
      <div className="flex flex-col gap-3 items-center justify-center w-full h-[22%]">
        <div
          className="flex justify-end w-full text-white px-2 md:hidden"
          onClick={handelMenuState}
        >
          <CloseIcon />
        </div>
        <span className="relative">
          <img
            src={
              "http://localhost:8081" +
              (profileImage === null
                ? data?.profileimg?.replaceAll("public", "")
                : profileImage)
            }
            alt=""
            className="w-16 h-16  rounded-full object-cover border-2 border-white"
          />
          <div className="inputfile-box absolute bottom-0 right-0 ">
            <input
              type="file"
              id="file"
              name="profileimg"
              className="hidden"
              onChange={imageUpload}
            />
            <label for="file">
              <span className="bg-white p-1 rounded-full relative flex items-center justify-center">
                <CameraAltOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              </span>
            </label>
          </div>
        </span>

        <div className="flex flex-col items-center  ">
          <p className="text-white font-medium text-[1.1rem] capitalize">
            {data?.firstName + " " + data?.lastName}
          </p>
          <p className="text-white font-medium text-[0.8rem] opacity-70">
            Mern Devloper
          </p>
        </div>
      </div>
      {/* info section */}
      <div className="px-8 md:pb-2 py-6 flex flex-col text-md gap-6  lg:gap-6 md:gap-4 md:text-[13px] lg:text-sm xl:text-md">
        <InfoCard
          title="Phone"
          info={data?.phoneNo}
          icon={<LocalPhoneOutlined />}
        />
        <InfoCard
          title="Username"
          info={data?.firstName + " " + data?.lastName}
          icon={<AccountCircleOutlined />}
        />
        {/* <InfoCard title="Status" info={data?.firstName + " " + data?.lastName}icon={<WorkOutlineOutlined/> }/> */}
      </div>

      <hr className="opacity-40 " />

      <div className="px-8 py-4 flex flex-col text-md gap-6  lg:gap-6 md:gap-4 md:text-[13px] lg:text-sm xl:text-md ">
        {sideNavigationBtnData.map(({ titleName, icon, switchs }, index) => (
          <Btns
            key={index}
            title={titleName || (theme === "dark" ? "Light Mode" : "Dark Mode")}
            icon={icon}
            exBtn={switchs}
          />
        ))}
      </div>

      <hr className="opacity-40 " />

      <div className="px-8 py-4 flex flex-col text-md gap-6  lg:gap-6 md:gap-4 md:text-[13px] lg:text-sm xl:text-md ">
        <Btns
          title="Logout"
          icon={<ExitToAppOutlined />}
          action={handleLogout}
        />
      </div>
      <div className=" w-full flex justify-center mt-4  md:hidden">
        <button
          className=" dark:bg-white bg-black text-white  flex justify-center items-center  dark:text-black rounded-full px-4 py-2"
          onClick={() => dispatch(handleGroupForm(true))}
        >
          Create Group
          <AddOutlinedIcon
            sx={{
              width: "30px",
              height: "30px",
              padding: "2px",
            }}
          />
        </button>
      </div>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
      }
    `}</style>
    </div>
  );
};

export default SideMenu;
