import React, { useEffect, useState } from "react";
import userimg from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleInfo,
  faImage,
  faMagnifyingGlass,
  faMicrophone,
  faPhone,
  faVideo,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBox from "../components/ChatBox";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { io } from "socket.io-client";
import axios from "axios";
import loading from "../images/buffering-colors.gif";

export const socket = io("https://pickbook-da7f.onrender.com", {
  transports: ["websocket", "polling"], // Enable both transports
});

const Message = () => {
  const { receiverId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profileDp, setProfileDp] = useState();
  const [messageBoxes, setMessageBoxes] = useState([]);
  const nav = useNavigate();
console.log(profileDp);

  const [messages, setMessages] = useState([]);
  const[senderprofile,setSenderprofile]=useState()
  const [newMessage, setNewMessage] = useState("");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
  const userId = user ? user._id : null;
  const userName = user ? user.name: null;
  let orderedMessageBox = messageBoxes.slice().reverse();

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-profile-for-chat/${receiverId}`
      );
      if (res && receiverId !== userId) {
        setProfileDp(res.data.profile?res.data.profile:res.data.user);
        setIsCommentVisible(true);
      } else if (receiverId === userId) {
        setProfileDp();
      }
    } catch (error) {}
  };


const fetchSenderProfile = async () => {
  try {
    const res = await axios.get(
      `http://localhost:7000/api/v1/user/get-profile-for-users/${userName}`
    );
    if (res) {
      setSenderprofile(res.data.profile._id);
      
    } else {
      setSenderprofile();
    }
  } catch (error) {}
};

  const fetchMessageBox = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-chatters/${userId}`
      );
      if (res.data) {
        setMessageBoxes(res.data);
        setIsLoading(false)
      } else {
        setMessageBoxes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      console.log("Message received:", message);

      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    const messageData = {
      sender: userId,
      receiver: receiverId,

      message: newMessage,
    };

    // Emit the message event
    socket.emit("sendMessage", messageData);

    setNewMessage("");
    const res= await axios.post('https://pickbook-da7f.onrender.com/api/v1/user/add-chatters',{senderId:userId,receiverId:profileDp._id,receiverUserId:receiverId,senderProfileId:senderprofile})
    console.log(res.data);
  };

  const fetchMessage = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-messages/${userId}/${receiverId}`
      );
      if (res) {
        setMessages(res.data);
      } else {
        setMessages([]);
      }
    } catch (error) {}
  };

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setNewMessage((prevInput) => prevInput + emojiData.emoji); // Correct emoji property
  };
  

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };

  useEffect(() => {
    handleDataFromChild();
    fetchMessage();
    fetchUserProfile();
    fetchMessageBox();
    fetchSenderProfile()
  }, []);

  useEffect(() => {
    fetchMessage();
    fetchUserProfile();
  }, [receiverId]);

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);

  useEffect(() => {
    fetchMessageBox();
  }, [isCommentVisible]);

  return (
    <div className="absolute  w-full h-screen">
      <div className="max-[800px]:hidden">
        <NavBar />
      </div>

      {user ? (
        <div className="flex px-[2%] h-full  ">
          <div className="w-[40%] max-[1240px]:w-[60%] max-[960px]:w-[80%] max-[800px]:w-full h-screen overflow-y-scroll mr-[1%] py-[2%] max-[800px]:hidden ">
            <div className="flex justify-between  bg-gray-100 py-[3%] px-[6%]  rounded-[10px]">
              <div className="w-[70%]">
                <input
                  className="bg-gray-100 w-full font-QRegular outline-none"
                  placeholder="Search User"
                  type="text"
                />
              </div>
              <div className="h-[18px] text-gray-400">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="flex justify-between p-[6%] font-QBold  border-b-[1px]">
              <h2>Message</h2>
              <h2 className="text-[#8735C8]">See all</h2>
            </div>
            {isLoading ? (
              <div className="h-[400px] max-[450px]:h-[300px] ">
                <img
                  src={loading}
                  alt=""
                  className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]"
                />
              </div>
            ) : null}
            {orderedMessageBox.length > 0 ? (
              <div>
                {orderedMessageBox.map((message) => {
                  return (
                    <div
                      onClick={() =>
                        message.user !== receiverId &&
                        nav(`/message/${message.user}`)
                      }
                      className="flex justify-between items-center my-[3%] p-[3%]  border-b-[1px] cursor-pointer"
                    >
                      <img
                        className="h-[60px] w-[60px] object-cover rounded-[50%]"
                        src={message.image}
                        alt=""
                      />
                      <div className="w-[80%] max-[800px]:w-[88%] ">
                        <div className="flex justify-between  ">
                          <h3 className="font-QBold">{message.userName}</h3>
                        </div>
                        <div className="flex justify-between font-QRegular text-gray-500">
                          <div className="w-[80%] text-line  text-left  h-[30px]  max-[425px]:h-[20px]">
                            Tap to chat
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : isLoading === false ? (
              <div className="font-QSemi my-[4%] h-[150px] flex justify-center items-center">
                <h1>No messages yet</h1>
              </div>
            ) : null}
          </div>

          <div className="hidden max-[800px]:block w-[40%] max-[1220px]:w-[60%] max-[930px]:w-[80%] max-[800px]:w-full max-h-screen overflow-y-scroll py-[2%] ">
            <div className="flex justify-between  bg-gray-100 py-[3%] px-[6%]  rounded-[10px]">
              <div className="w-[70%]">
                <input
                  className="bg-gray-100 w-full font-QRegular outline-none"
                  placeholder="Search User"
                  type="text"
                />
              </div>
              <div className="h-[18px] text-gray-400">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-full h-full"
                />
              </div>
            </div>

           

            <div className="flex justify-between p-[6%] font-QBold  border-b-[1px]">
              <h2>Message</h2>
              <h2 className="text-[#8735C8]">See all</h2>
            </div>
            {isLoading ? (
              <div className="h-[400px] max-[450px]:h-[300px] ">
                <img
                  src={loading}
                  alt=""
                  className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]"
                />
              </div>
            ) : null}
            {orderedMessageBox.length>0 ?
            <div>
              
                {orderedMessageBox.map((message, index) => {
                  return (
                    <div
                      onClick={() => {
                        setIsCommentVisible(true);
                        message.user !== receiverId &&
                          nav(`/message/${message.user}`);
                      }}
                      className={`flex justify-between items-center  p-[3%] max-[425px]:p-[2%] max-[425px]:text-[14px] border-b-[1px] ${
                        index === messageBoxes.length - 1 ? "mb-[40px]" : "mb-0"
                      } `}
                    >
                      <img
                        className="h-[60px] aspect-square max-[425px]:h-[50px] max-[640px]:mr-[3%] object-cover rounded-[50%]"
                        src={message.image}
                        alt=""
                      />
                      <div className="w-[75%] max-[800px]:w-[85%] max-[550px]:w-[84%] max-[450px]:w-[82%] max-[350px]:w-[81%] ">
                        <div className="flex justify-between   ">
                          <h3 className="font-QBold">{message.userName}</h3>
                        </div>
                        <div className="flex justify-between font-QRegular text-gray-500">
                          <div className="w-[80%] text-line  text-left  h-[30px]  max-[425px]:h-[20px]">
                            Tap to chat
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>:isLoading===false?(<div className="font-QSemi my-[4%] h-[150px] flex justify-center items-center" >
        <h1>No messages yet</h1>
      </div>):null}
          </div>

          <div className="bg-white shadow-lg w-full h-screen overflow-y-scroll max-[800px]:hidden  ">
            <div className="flex justify-between items-center px-[1%] pb-[1%] pt-[2%] border-b-[1px] top-[70px]  bg-white z-10 fixed w-[67.9%] max-[1240px]:w-[59.4%] max-[960px]:w-[52.8%]">
            {profileDp && (
                <div className="flex items-center font-QSemi">
                  <img
                    className="h-[60px] aspect-square object-cover rounded-[50%] mr-[20%]"
                    src={profileDp.image?profileDp.image:userimg}
                    alt=""
                  />
                  <h2>{profileDp.userName?profileDp.userName:profileDp.name}</h2>
                </div>
              )}

              <div className="flex justify-between w-[15%] max-[930px]:w-[25%] text-[22px]">
                <FontAwesomeIcon icon={faPhone} />
                <FontAwesomeIcon icon={faVideo} />
                <FontAwesomeIcon icon={faCircleInfo} />
              </div>
            </div>

            <div className="relative">
              <div
                onClick={() => setShowPicker(false)}
                className="absolute top-[160px] w-full p-[1%] "
              >
                {messages.map((message, index) => {
                  return message.sender !== userId ? (
                    <div
                      key={index}
                      className={`flex flex-col items-start font-QMedium ${
                        index === messages.length - 1 ? "mb-[80px]" : "mb-0"
                      } `}
                    >
                      {/* Receiver Message */}
                      <div className="bg-gray-100 p-3 mt-4 ml-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl items-start flex max-w-[75%]">
                        <h2 className="mr-2 text-left">{message.message}</h2>
                        <h3 className="text-gray-500">{message.time}</h3>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={`flex flex-col items-end font-QMedium ${
                        index === messages.length - 1 ? "mb-[80px]" : "mb-0"
                      } `}
                    >
                      {/* Sender Message */}
                      <div className="bg-gray-100 p-3 mt-4 mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl items-end flex max-w-[75%]">
                        <h2 className="mr-2 text-left">{message.message}</h2>
                        <h3 className="text-gray-500">{message.time}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-[1%] pb-[1%] fixed bottom-0 w-[67.9%] max-[1240px]:w-[59.4%] max-[960px]:w-[52.8%] bg-white">
              <div className=" flex justify-between items-center text-[20px] h-[50px] text-gray-500 px-[1%]  bg-white z-10  rounded-[30px] border-[1px]">
                {showPicker && (
                  <div className="absolute bottom-[64px]">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                <button onClick={() => setShowPicker(!showPicker)}>
                  <FontAwesomeIcon icon={faFaceSmile} />
                </button>
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-[80%] outline-none font-QRegular text-[18px] "
                  type="text"
                  placeholder="Message..."
                />
                {newMessage ? (
                  <button
                    onClick={sendMessage}
                    className="w-[15%] font-QBold text-[#8735C8] max-[930px]:w-[25%] flex justify-end p-[1%] "
                  >
                    send
                  </button>
                ) : (
                  <div className="w-[15%] max-[930px]:w-[25%] flex justify-between p-[1%]">
                    <FontAwesomeIcon icon={faMicrophone} />
                    <FontAwesomeIcon icon={faImage} />
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}

      <AnimatePresence>
        {isCommentVisible && (
          <motion.div
            initial={{ x: 1500 }}
            animate={{ x: 0 }}
            exit={{ x: 1500 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <ChatBox
                onDataSend={handleDataFromChild}
                receiverId={receiverId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isCommentVisible ? null : <Footer />}
    </div>
  );
};

export default Message;
