import React, { useRef, useState } from "react";
import ChatsList from "../../layout/chats";
import {
  faEllipsisVertical,
  faPaperclip,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import InputEmoji from "react-input-emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SendOutlined from "@mui/icons-material/SendOutlined";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../components/profileImage";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { useEffect } from "react";
import { createChat, createGroupChat, setChats } from "./chatSlice";
import { app } from "../../firebase";
import moment from "moment";
import { Button } from "@mui/material";
import GroupForm from "../../components/groupChat/groupForm";
import WestIcon from "@mui/icons-material/West";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

export const ChatApp = () => {
  const [message, setMessage] = useState("");
  const userChats = useSelector((state) => state?.chats);
  const users = useSelector((state) => state.chats?.users);
  const chatType = useSelector((state) => state?.chats.group);
  const [openChat, setOpenChat] = useState(
    userChats?.activeChat.name ? true : false
  );
  const personsFlag = useSelector((state) => state.chats?.personsFlag);
  const [chat, setChat] = useState();
  const [groupChat, setGroupChat] = useState();
  const profileImage = useSelector((state) => state.user.profileImg);
  const messageref = useRef(null);
  const [groupUsersInfo, setGroupUsersInfo] = useState([]);
  const data = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.user);

  const firestore = getFirestore(app);
  const db = getDatabase(app);

  useEffect(() => {
    setGroupUsersInfo(users);
  }, []);

  useEffect(() => {
    const unsubscribeFirestore = onSnapshot(
      collection(firestore, "chats"),
      (snapshot) => {
        const updatedChats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChat(updatedChats);
        dispatch(setChats(updatedChats));
      }
    );
    return () => unsubscribeFirestore();
  }, [firestore, db, dispatch]);

  useEffect(() => {
    const unsubscribeFirestore = onSnapshot(
      collection(firestore, "groupChat"),
      (snapshot) => {
        const updatedChats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroupChat(updatedChats);
      }
    );
    return () => unsubscribeFirestore();
  }, [firestore, dispatch]);

  useEffect(() => {
    messageref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, userChats]);

  const handleChat = (data) => {
    dispatch(
      createChat({
        id: [user["_id"], userChats?.activeChat?.id],
        data: message !== "" ? message : data,
      })
    );
    setMessage("");
  };

  const handleGroupChat = () => {
    dispatch(
      createGroupChat({
        data: message,
        chatId: userChats.activeChat.id,
        id: data["_id"],
      })
    );
  };

  const handleSubmitForm = (data) => {
    let id;
    id = chat?.filter((item) => {
      return (
        item.id === user["_id"] + userChats?.activeChat?.id ||
        item.id === userChats?.activeChat?.id + user["_id"]
      );
    })[0]?.id;
    if (id === undefined) {
      handleChat(`video calling you`);
      id = chat?.filter((item) => {
        return (
          item.id === user["_id"] + userChats?.activeChat?.id ||
          item.id === userChats?.activeChat?.id + user["_id"]
        );
      })[0]?.id;
    }
  };

  const handleWindow = () => {
    if (!openChat) {
      setOpenChat(true);
    }
  };

  return (
    <>
      {openChat ? (
        <div className="lg:w-[70%] md:w-[61%] xl:w-[75%] h-[90%] flex flex-row dark:bg-black dark:text-white border-t-2">
          <Helmet>
            <title>ChatApp</title>
          </Helmet>
          <ToastContainer />
          <div className=" relative  w-[100%] flex flex-col ">
            <GroupForm />
            <header className="h-[8%] flex items-center justify-center px-6 border-b-2">
              <div className="flex gap-4 w-full justify-center items-center h-full">
                <span className="pl-2" onClick={() => setOpenChat(false)}>
                  {<WestIcon />}
                </span>
                <img
                  src={userChats?.activeChat?.src}
                  alt=""
                  className="w-[42px] h-[42px] object-cover rounded-full border-2"
                />
                <div className="w-full">
                  <h2 className="dark:text-white text-md font-medium font-spacegrotesk capitalize">
                    {userChats.activeChat?.name}
                  </h2>
                  <p className="text-sm font-light">
                    {userChats.activeChat?.lastActive}
                  </p>
                </div>
                <div className="flex justify-center items-center h-full opacity-80 gap-4">
                  <FontAwesomeIcon icon={faPhone} />
                  <FontAwesomeIcon icon={faVideo} onClick={handleSubmitForm} />
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
            </header>
            <div className="relative h-[90%] bg-[#F9F9F9] dark:bg-black px-6 py-2 overflow-y-scroll no-scrollbar">
              {chat
                ?.filter((item) => {
                  return (
                    item.id === user["_id"] + userChats?.activeChat?.id ||
                    item.id === userChats?.activeChat?.id + user["_id"]
                  );
                })[0]
                ?.messages?.map((chat, index) => (
                  <div className="flex flex-col gap-4 mb-4" key={index}>
                    {chat?.createdBy === user["_id"] ? (
                      <div className="flex flex-col gap-1">
                        <div className="bg-white text-black float-left w-[45%] py-2 px-4 rounded-r-xl rounded-tl-xl break-words">
                          {chat?.message}
                        </div>
                        <div className="flex items-center gap-2">
                          <ProfileImage
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              (profileImage === null
                                ? user?.profileimg?.replaceAll("public", "")
                                : profileImage)
                            }
                            wid="30"
                          />
                          <span className="text-sm font-medium capitalize">
                            {user.firstName + " " + user.lastName} | you
                          </span>
                        </div>
                        <span className="text-[0.65rem] opacity-40 font-semibold">
                          {chat.createdAt.toDate().toLocaleDateString()}{" "}
                          {moment(chat.createdAt.toDate()).format("hh:mm A")}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="flex flex-col items-end gap-1"
                        key={index}
                      >
                        <div className="bg-[#22243d] text-white float-right w-[45%] py-2 px-4 rounded-l-xl rounded-tr-xl break-words">
                          {chat?.message}
                        </div>
                        <div className="flex items-center gap-2">
                          <ProfileImage
                            src={userChats.activeChat?.src}
                            wid="30"
                          />
                          <span className="text-sm font-medium capitalize">
                            {userChats.activeChat?.name} | sender
                          </span>
                        </div>
                        <span className="text-[0.65rem] opacity-40 font-semibold">
                          {chat.createdAt.toDate().toLocaleDateString()}
                          {moment(chat.createdAt.toDate()).format("hh:mm A")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              {groupChat
                ?.filter((item) => {
                  return item?.group?.groupUsers.includes(user["_id"]);
                })
                ?.filter((item) => {
                  return item.id === userChats.activeChat?.id;
                })[0]
                ?.messages?.map((message, index) => (
                  <div className="flex flex-col gap-4 mb-4" key={index}>
                    {message?.createdBy === user["_id"] ? (
                      <div className="flex flex-col gap-1">
                        <div className="bg-white text-black float-left w-[45%] py-2 px-4 rounded-r-xl rounded-tl-xl break-words">
                          {message?.message}
                        </div>
                        <div className="flex items-center gap-2">
                          <ProfileImage
                            src={
                              "http://localhost:8081" +
                              (profileImage === null
                                ? user?.profileimg?.replaceAll("public", "")
                                : profileImage)
                            }
                            wid="30"
                          />
                          <span className="text-sm font-medium capitalize">
                            {user.firstName + " " + user.lastName} | you
                          </span>
                        </div>
                        <span className="text-[0.65rem] opacity-40 font-semibold">
                          {message.createdAt.toDate().toLocaleDateString()}
                          {moment(message.createdAt.toDate()).format("hh:mm A")}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="flex flex-col items-end gap-1"
                        key={index}
                      >
                        <div className="bg-[#22243d] text-white float-right w-[45%] py-2 px-4 rounded-l-xl rounded-tr-xl break-words">
                          {message?.message}
                        </div>
                        <div className="flex items-center gap-2">
                          {groupUsersInfo
                            ?.filter((user) => {
                              return user["_id"] === message?.createdBy;
                            })
                            .map((user) => (
                              <>
                                <ProfileImage
                                  src={`http://localhost:8081${user?.profileimg?.replaceAll(
                                    "public",
                                    ""
                                  )}`}
                                  wid="30"
                                />
                                <span className="text-sm font-medium capitalize">
                                  {`${user.firstName} ${user.lastName}`} |
                                  sender
                                </span>
                              </>
                            ))}
                        </div>
                        <span className="text-[0.65rem] opacity-40 font-semibold">
                          {message?.createdAt.toDate().toLocaleDateString()}
                          {"    "}
                          {moment(message?.createdAt.toDate()).format(
                            "hh:mm A"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              <div ref={messageref}></div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                chatType ? handleGroupChat() : handleChat();
              }}
              className="h-[14%] dark:bg-black border-t-2 bg-white flex relative items-center px-4  justify-between text-black"
            >
              <FontAwesomeIcon
                icon={faPaperclip}
                className="absolute left-11 opacity-40"
              />
              <div className="w-[90%]">
                <InputEmoji
                  value={message}
                  onChange={setMessage}
                  cleanOnEnter
                  onEnter={chatType ? handleGroupChat : handleChat}
                  placeholder="Type a message"
                  className=" p-4 border border-gray-300 rounded-md"
                />
              </div>
              <Button
                type="submit"
                className="absolute flex items-center z-[99]  opacity-70 -rotate-45"
              >
                {" "}
                <SendOutlined sx={{ fontSize: "22px" }} />
              </Button>
            </form>
          </div>
          <div
            className={`${
              personsFlag
                ? "w-[300px] h-[89%] py-4 absolute z-[9999] md:hidden xs:flex right-0 transition-all ease-in-out delay-75 bg-white dark:bg-black border-r-2"
                : "xl:w-[21%] border-l-2 md:w-[30%] lg:w-[24%] ml-4 h-[88%] dark:bg-black border-t-2 py-4 -mt-[2px] absolute z-[9] right-0 xl:flex xs:hidden md:flex flex-col transition-all ease-in-out delay-75 bg-white border-r-2"
            }`}
          >
            <ChatsList handleWindow={handleWindow} />
          </div>
        </div>
      ) : (
        <div className="w-[100%] relative h-full dark:bg-black py-2 dark:text-white border-t-2 flex flex-col border-r-2">
          <GroupForm />
          <ChatsList handleWindow={handleWindow} />
        </div>
      )}
    </>
  );
};
