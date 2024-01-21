import React, { useEffect, useState } from "react";
import PersonChatCard from "../components/chatslList/personChatCard";
import TopHeader from "../components/chatslList/topHeader";
import { useDispatch, useSelector } from "react-redux";
import { createActiveChat } from "../pages/chatApp/chatSlice";
import SearchUser from "../components/searchUser";
import { app } from "../firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

const ChatsList = ({ handleWindow }) => {
  const users = useSelector((state) => state.chats?.users);
  const [groupData, setGroupData] = useState([]);
  const [groupList, setGroupList] = useState(false);
  const data = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const handelChat = (data, flag) => {
    dispatch(createActiveChat({ data, flag }));
  };

  const firestore = getFirestore(app);
  useEffect(() => {
    const unsubscribeFirestore = onSnapshot(
      collection(firestore, "groupChat"),
      (snapshot) => {
        const updatedChats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroupData(updatedChats);
      }
    );
    return () => unsubscribeFirestore();
  }, [firestore, dispatch]);

  return (
    <div className="w-full h-full bg-white dark:bg-black dark:text-white">
      <div className="w-full h-[7%] justify-between px-4 flex">
        <SearchUser show="block" />
        <button
          className="flex justify-center items-center gap-1 "
          onClick={() => setGroupList(!groupList)}
        >
          {groupList ? (
            <>
              {" "}
              <GroupIcon fontSize="medium" />
              <span className="text-xs">Groups</span>
            </>
          ) : (
            <>
              <PersonIcon fontSize="medium" />
              <span className="text-xs">Person</span>
            </>
          )}
        </button>
      </div>
      <TopHeader name={!groupList ? "Chats" : " GroupChats"} />

      <div className="h-[88%] md:h-[90.9%] xl:h-[91.9%] dark:bg-black overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!groupList ? (
          users.length > 0 ? (
            users
              ?.filter((item) => item["_id"] !== data["_id"])
              ?.map((user, index) => (
                <PersonChatCard
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    user?.profileimg?.replaceAll("public", "")
                  }
                  key={index}
                  name={user?.firstName + " " + user?.lastName}
                  profileDescription={user?.description}
                  handleWindow={handleWindow}
                  email={user?.email}
                  lastActive="11:00 PM"
                  handleChat={handelChat}
                  id={user["_id"]}
                />
              ))
          ) : (
            <p className="h-full flex items-center justify-center">
              No User for Chats
            </p>
          )
        ) : groupData.length > 0 ? (
          groupData
            .map((item) => {
              return item.group;
            })
            .filter((item) => {
              return item.groupUsers?.includes(data["_id"]);
            })
            .map(({ groupName, groupDescription, id, imageData }, index) => (
              <PersonChatCard
                src={imageData?.base64textString}
                name={groupName}
                key={index}
                id={groupData[index].id}
                handleWindow={handleWindow}
                handleChat={handelChat}
                type={true}
                profileDescription={groupDescription}
                lastActive="11:00 PM"
              />
            ))
        ) : (
          <p className="h-full flex items-center justify-center">
            No Group Joined
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
