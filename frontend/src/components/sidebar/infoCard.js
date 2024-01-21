import React from "react";

const InfoCard = ({ icon, info, title }) => {
  return (
    <div className="flex text-white gap-2 items-center">
      <span className="">{icon}</span>
      <div className="flex flex-col ">
        <span className="font-light  capitalize">{info}</span>
        <span className=" font-extralight opacity-60">{title}</span>
      </div>
    </div>
  );
};

export default InfoCard;
