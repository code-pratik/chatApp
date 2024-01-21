import React from "react";

const ProfileImage = ({ src, wid, activeColor }) => {
  return (
    <span className="relative inline-block">
      <img
        src={src}
        alt=""
        style={{width:`${wid}px`, height:`${wid}px` }}
        className={`rounded-full object-cover border-2`}
      />
      <div
        className={`p-1.5 rounded-full bg-${activeColor} absolute bottom-0.5 right-0`}
      ></div>
    </span>
  );
};

export default ProfileImage;
