import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { searchUsers } from "../pages/chatApp/chatSlice";
import useDebounce from "../hook/useDebounce";

const SearchUser = ({ show, placeholder }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const debouncedSearchValue = useDebounce(search, 2000);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(searchUsers(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <div className="relative h-[92%] flex items-center">
      <SearchOutlinedIcon
        className="absolute right-4"
        sx={{
          width: "20px",
          opacity: "70px",
        }}
      />
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder={placeholder}
        className={`w-full h-full rounded-full px-4 outline-none bg-[#F9F9F9] text-black placeholder:text-black placeholder:opacity-60 placeholder:text-sm xs:${
          show ? "block" : "hidden"
        }`}
      />
    </div>
  );
};

export default SearchUser;
