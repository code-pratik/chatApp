import React from "react";
import ProfileImage from "../profileImage";

const PersonChatCard = ({
  src,
  name = "pratik prajapati",
  profileDescription = "Hii, I am using ChatAPP",
  lastActive = "11:00 pm",
  handleChat,
  id,
  email,
  handleWindow,
  type = false,
}) => {
  return (
    <div
      className="flex gap-2 items-center justify-between p-3 px-4"
      key={id}
      onClick={() => {
        handleWindow();
        handleChat({ name, lastActive, src, id, email }, type);
      }}
    >
      <div className="flex gap-4 w-[70%]">
        <ProfileImage src={src} wid="50" activeColor="green-500" />
        <div className="flex flex-col  overflow-hidden w-[50%]">
          <span className=" text-[0.9rem] font-medium capitalize">{name}</span>
          <span className=" line-clamp-1 text-xs text-[#868484]">
            {profileDescription}
          </span>
        </div>
      </div>
      <p className="text-xs whitespace-nowrap text-[#868484]">{lastActive}</p>
    </div>
  );
};

export default PersonChatCard;
