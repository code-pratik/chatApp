import React from "react";

const Btns = ({ icon, title, exBtn, action }) => {
  return (
    <div className="flex flex-col ">
      <button
        className="flex text-white gap-2 items-center relative"
        onClick={action}
      >
        <span className="">{icon}</span>
        <div className="flex flex-col .items-center ">
          <span className="font-light whitespace-nowrap capitalize">
            {title}
          </span>
          {exBtn ? (
            <span className="absolute right-0  top-[20%]">{exBtn}</span>
          ) : (
            ""
          )}
        </div>
      </button>
    </div>
  );
};

export default Btns;
