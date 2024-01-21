/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily:{
        sans: ['Public Sans', 'Roboto', 'Space Grotesk', 'sans-serif'],
        spacegrotesk:['Space Grotesk', "sans-serif"]
      }
    },
    screens:{
      xs: "0",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px"
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
],

}

// import React, { useRef, useState } from "react";
// import ChatsList from "../../layout/chats";
// import {
//   faEllipsisVertical,
//   faPaperclip,
//   faPhone,
//   faVideo,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SendOutlined from "@mui/icons-material/SendOutlined";
// import MicNoneOutlined from "@mui/icons-material/MicNoneOutlined";
// import { useDispatch, useSelector } from "react-redux";
// import ProfileImage from "../../components/profileImage";
// import { getFirestore, collection, onSnapshot } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { useEffect } from "react";
// import { createChat, setChats } from "./chatSlice";
// import { app } from "../../firebase";
// import moment from "moment";
// import { Button } from "@mui/material";
// import SearchUser from "../../components/searchUser";
// export const ChatApp = () => {
//   const [message, setMessage] = useState();
//   const userChats = useSelector((state) => state?.chats);
//   const [openChat, setOpenChat] = useState(
//     userChats?.activeChat.name ? true : false
//   );
//   const personsFlag =  useSelector((state) => state.chats?.personsFlag)
//   const [chat, setChat] = useState();
//   const profileImage = useSelector((state) => state.user.profileImg);
//   const messageref = useRef(null);
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state?.user);

//   const firestore = getFirestore(app);
//   const db = getDatabase(app);

//   useEffect(() => {
//     const unsubscribeFirestore = onSnapshot(
//       collection(firestore, "chats"),
//       (snapshot) => {
//         const updatedChats = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setChat(updatedChats);
//         dispatch(setChats(updatedChats));

//         return () => unsubscribeFirestore();
//       }
//     );
//   }, [firestore, db, dispatch]);

//   useEffect(() => {
//     messageref?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat, userChats]);

 

//   const handleChat = () => {
//     dispatch(
//       createChat({
//         id: [user["_id"], userChats?.activeChat?.id],
//         data: message,
//       })
//     );
//     setMessage("");
//   };

//   const handleWindow = () => {
//     if (!openChat) {
//       setOpenChat(true);
//     }
//   };



//   return (
//     <div className="lg:w-[68%] md:w-[66.3%] xl:w-[75.5%] h-[91.2%] flex flex-row dark:bg-black dark:text-white">
//       {openChat ? (
//         <>
//           <div className="max-xl:w-[80%] w-[100%] flex flex-col  border-r-2">
//             <header className=" h-[10%]  flex items-center justify-center p-4 border-b-2">
//               <div className="flex gap-4 w-full justify-center items-center h-full  ">
//                 <img
//                   src={userChats?.activeChat?.src}
//                   alt=""
//                   className="w-[42px]  h-[42px] object-cover rounded-full border-2"
//                 />
//                 <div className="w-full">
//                   <h2 className=" dark:text-white text-md font-medium font-spacegrotesk capitalize">
//                     {userChats.activeChat?.name}
//                   </h2>
//                   <p className="text-sm font-light">
//                     {userChats.activeChat?.lastActive}
//                   </p>
//                 </div>
//                 <div className="flex justify-center items-center h-full  opacity-80 gap-4 ">
//                   <FontAwesomeIcon icon={faPhone} />
//                   <FontAwesomeIcon icon={faVideo} />
//                   <FontAwesomeIcon icon={faEllipsisVertical} />
//                 </div>
//               </div>
//             </header>
//             <div className="h-[80%] bg-[#F9F9F9] dark:bg-black px-6 py-2  overflow-y-scroll no-scrollbar ">
//               {chat
//                 ?.filter((item) => {
//                   return (
//                     item.id === user["_id"] + userChats?.activeChat?.id ||
//                     item.id === userChats?.activeChat?.id + user["_id"]
//                   );
//                 })[0]
//                 ?.messages?.map((chat) => (
//                   <div className="flex flex-col gap-4 mb-4">
//                     {chat?.createdBy === user["_id"] ? (
//                       <div className="flex flex-col gap-1">
//                         <div className="bg-white text-black float-left w-[45%]  py-2 px-4  rounded-r-xl rounded-tl-xl">
//                           {chat?.message}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <ProfileImage
//                             src={
//                               "http://localhost:8081" +
//                               (profileImage === null
//                                 ? user?.profileimg?.replaceAll("public", "")
//                                 : profileImage)
//                             }
//                             wid="30"
//                           />
//                           <span className="text-sm  font-medium capitalize">
//                             {user.firstName + " " + user.lastName} | you
//                           </span>
//                         </div>
//                         <span className=" text-[0.65rem] opacity-40 font-semibold">
//                           {chat.createdAt.toDate().toLocaleDateString()}
//                           {"    "}
//                           {moment(chat.createdAt.toDate()).format("hh:mm A")}
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-end gap-1 ">
//                         <div className="bg-[#22243d] text-white float-right w-[45%] py-2 px-4 rounded-l-xl rounded-tr-xl ">
//                           {chat?.message}
//                         </div>
//                         <div className="flex items-center gap-2 ">
//                           <ProfileImage
//                             src={userChats.activeChat?.src}
//                             wid="30"
//                           />
//                           <span className="text-sm  font-medium capitalize">
//                             {userChats.activeChat?.name} | sender
//                           </span>
//                         </div>
//                         <span className=" text-[0.65rem] opacity-40 font-semibold">
//                           {chat.createdAt.toDate().toLocaleDateString()}
//                           {"    "}
//                           {moment(chat.createdAt.toDate()).format("hh:mm A")}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               <div ref={messageref}></div>
//             </div>
//             <form
//               onSubmit={handleChat}
//               className="h-[10%] dark:bg-black border-t-2  bg-white flex  relative items-center px-8 justify-between  text-black"
//             >
//               <FontAwesomeIcon
//                 icon={faPaperclip}
//                 className="absolute left-11 opacity-40"
//               />
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="w-[93%] h-[65%] bg-[#F9F9F9] rounded-full px-8 outline-none"
//               />
//               <Button
//                 type="submit"
//                 className="absolute  flex items-center xl:right-14  opacity-70 -rotate-45"
//               >
//                 {" "}
//                 <SendOutlined
//                   sx={{
//                     fontSize: "22px",
//                   }}
//                 />
//               </Button>

//               <button className="bg-[#B873FE] h-[65%] text-2xl text-white px-[0.85rem] rounded-full flex items-center">
//                 <MicNoneOutlined />
//               </button>
//             </form>
//           </div>
//           <div className={`${personsFlag ? "w-[300px]  py-4 absolute z-[9999]  hidden  transition-all ease-in-out delay-75 border-r-2" : " xl:w-[20%] md:w-[25%] h-[91%] dark:bg-black  py-4 absolute z-[9999]  right-0 xl:flex xs:hidden  md:flex flex-col transition-all ease-in-out delay-75  border-r-2"}`}>
       
            
//             <ChatsList handleWindow={handleWindow}   />{" "}
//           </div>{" "}
//         </>
//       ) : (
//         <div className="w-[100%] flex flex-col  border-r-2">
//           {" "}
//           <ChatsList handleWindow={handleWindow} />{" "}
//         </div>
//       )}
//     </div>
//   );
// };
