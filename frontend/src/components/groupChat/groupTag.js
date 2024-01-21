import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { loginFormTheme } from "../../theme/formTheme";
import axios from "axios";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { ToastContainer, toast } from "react-toastify";
import { handleGroupForm } from "../../pages/chatApp/chatSlice";

export default function GroupTags() {
  const [search, setSearch] = useState("");
  const data = useSelector((state) => state.user.user);
  const [selectedTags, setSelectedTags] = useState([]);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chats.users);
  const [imageData, setImageData] = useState({
    base64textString: "",
    imageName: "",
    showImage: false,
    formData: "",
  });

  const handleTagChange = (event, values) => {
    setSelectedTags(values);
  };

  const handelInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const imageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageData({
        base64textString: reader.result,
        imageName: file.name,
        showImage: true,
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const createGroup = async () => {
    const users = [];
    selectedTags.map((item) => {
      users.push(item.value);
    });
    const datas = {
      ...formValues,
      groupUsers: [...users, data["_id"]],
      imageData,
      messages: [],
    };
    try {
      const res = await axios.post(
        "http://localhost:8081/api/chat/group",
        datas
      );
      setFormValues({
        groupName: "",
        groupDescription: "",
      });
      toast.success("Group created  successfully ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(handleGroupForm(false));
    } catch (error) {
      toast.error(error.message);
    }
    setSelectedTags([]);
    setImageData({});
  };

  return (
    <ThemeProvider theme={loginFormTheme}>
      <ToastContainer />

      <label>Group Name</label>
      <div className="flex flex-col gap-4">
        <TextField
          type="text"
          name="groupName"
          value={formValues.groupName}
          onChange={handelInputChange}
          fullWidth
          autoComplete="off"
          color="secondary"
          placeholder="Enter Group name"
          InputProps={{
            style: {
              fontSize: "14px",
              fontWeight: "normal",
              height: "40px",
              color: "white",
              border: "1px solid #5B5F77",
            },
          }}
          margin="normal"
        />
        <div>
          <label>Select Group Members</label>
          <Autocomplete
            multiple
            value={selectedTags}
            onChange={handleTagChange}
            limitTags={3}
            id="multiple-limit-tags"
            options={filteredUsers.map((user) => ({
              label: `${user.firstName} ${user.lastName}`,
              value: user._id,
            }))}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ background: "white" }}
                placeholder="Search and Select Group Members"
              />
            )}
            sx={{ width: "100%", marginTop: "10px", border: "1px solid white" }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Select Group Image </label>
          <div className="flex">
            <span className="relative ">
              <img
                src={imageData.base64textString}
                alt="add"
                className="w-16 h-16   rounded-full object-cover border-2 border-white"
              />
              <div className="inputfile-box absolute bottom-0 right-0 ">
                <input
                  type="file"
                  id="file1"
                  name="profileimge"
                  className="hidden"
                  accept="image/*"
                  onChange={imageUpload}
                />
                <label for="file1">
                  <span className="bg-white p-1 rounded-full relative flex items-center justify-center">
                    <CameraAltOutlinedIcon
                      sx={{
                        fontSize: "16px",
                        color: "black",
                      }}
                    />
                  </span>
                </label>
              </div>
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label>Add Description for Group</label>
          <TextField
            type="text"
            name="groupDescription"
            value={formValues.groupDescription}
            onChange={handelInputChange}
            fullWidth
            autoComplete="off"
            color="secondary"
            placeholder="Enter Group Description"
            InputProps={{
              style: {
                fontSize: "14px",
                fontWeight: "normal",
                height: "40px",
                color: "white",
                border: "1px solid #5B5F77",
              },
            }}
            margin="normal"
          />
        </div>
      </div>

      {/* <button  className="absolute -top-2 right-6 bg-[#15172B] text-white rounded-full px-2 py-2" onClick={handelGroup}>
          <AddOutlinedIcon sx={{
            width:"30px",
            height:"30px"
          }}/>
        </button> */}

      <button
        className=" bg-white w-[40%] mt-8  text-black rounded-full px-4 py-2"
        onClick={createGroup}
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
    </ThemeProvider>
  );
}
