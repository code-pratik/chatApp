import React, { useState } from 'react'
import { searchUsers } from '../pages/chatApp/chatSlice';
import { useDispatch } from 'react-redux';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchUser = ({show}) => {
    const [Search,setSearch] = useState()
    const dispatch = useDispatch()
    const handleSearch = (e) =>{
        setSearch(e.target.value)
        dispatch(searchUsers({value: e.target.value,flag:"search"}));
      }
  return (
    
  <div className=' relative h-[92%] flex items-center'>
      <SearchOutlinedIcon
      className="absolute right-4"
      sx={{
        width: "20px",
        opacity: "70px",
      }}
    />
    <input
      type="text"
      value={Search}
      onChange={handleSearch}
      placeholder="Search"
      className={`w-full h-full rounded-full px-4 outline-none bg-[#F9F9F9] text-black placeholder:text-black placeholder:opacity-60  placeholder:text-sm  xs:${show ? "block" : "hidden"} `}
    />
  </div>
  
  )
}

export default SearchUser