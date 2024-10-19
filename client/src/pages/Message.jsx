import React, { useEffect, useRef, useState } from "react";
import basil from "../images/basil.jpg";
import user2 from "../images/IMG_6351.jpeg";
import feed2 from "../images/IMG_8890.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCommentDots,
  faFaceSmile,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
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
import Comments from "../components/Comments";
import ChatBox from "../components/ChatBox";

const Message = () => {
  const [typing, setTyping] = useState("");

  const [content, setContent] = useState(
   
  );
console.log(content);

  const messageBoxes = [
    {
      img: user2,
      name: "Jordyn",
      time: "10.00 AM",
      mes: "hai,how do u do..! loremLorem ipsum dolor, sit amet consectetur adipisicing elit. Enim eaque explicabo fugiat nemo tenetur voluptatibus aspernatur rem voluptatem unde assumenda? Aut ad quisquam molestiae obcaecati minus nobis quis ratione dolores!",
      count: "2",
    },
    {
      img: user2,
      name: "Jordyn",
      time: "10.00 AM",
      mes: "hai,how do u do..!",
      count: "2",
    },
    {
      img: user2,
      name: "Jordyn",
      time: "10.00 AM",
      mes: "hai,how do u do..!",
      count: "2",
    },
    {
      img: user2,
      name: "Jordyn",
      time: "10.00 AM",
      mes: "hai,how do u do..!",
      count: "2",
    },
    
  ];

  const messages = [
    { message: "hai", time: "12:35", source: "sender" },
    { message: "how are you", time: "12:36", source: "sender" },
    { message: "fine", time: "12:35", source: "receiver" },
    { message: "hai", time: "12:35", source: "sender" },
    { message: "how are you", time: "12:36", source: "sender" },
    { message: "fine", time: "12:35", source: "receiver" },
    { message: "hai", time: "12:35", source: "sender" },
    { message: "how are you", time: "12:36", source: "sender" },
    { message: "fine", time: "12:35", source: "receiver" },
    { message: "hai", time: "12:35", source: "sender" },
    { message: "how are you", time: "12:36", source: "sender" },
    { message: "fine", time: "12:35", source: "receiver" },
    { message: "hai", time: "12:35", source: "sender" },
    { message: "how are you", time: "12:36", source: "sender" },
    { message: "fine", time: "12:35", source: "receiver" },
  ];
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    setTyping((prevInput) => prevInput + emojiData.emoji); // Correct emoji property
    // Hide emoji picker after selection
  };
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };

  useEffect(() => {
    handleDataFromChild();
  }, []);

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);

  return (
    <div className="absolute  w-full h-screen">
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

          <div>
            {messageBoxes.map((message) => {
              
              
              return (
                <div className="flex justify-between items-center my-[3%] p-[3%]  border-b-[1px]">
                  <img
                    className="h-[60px] w-[60px] object-cover rounded-[50%]"
                    src={user2}
                    alt=""
                  />
                  <div className="w-[80%] max-[800px]:w-[88%] ">
                    <div className="flex justify-between mb-[4%] ">
                      <h3 className="font-QBold">Jordyn</h3>
                      <h4 className="font-QRegular text-gray-500 ">
                        {" "}
                        10.00 AM
                      </h4>
                    </div>
                    <div className="flex justify-between font-QRegular text-gray-500">
                      <div className="w-[80%] text-line  text-left  h-[30px]  max-[425px]:h-[20px]" >
                     
                      {message.mes}
                       
                    
                      </div>
                      
                      <h3 className="bg-[#8735C8] text-white  h-[26px] max-[425px]:h-[22px] aspect-square rounded-[50%] font-QBold">
                        2
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

          <div>
            {messageBoxes.map((message) => {
              console.log(message.mes.length)
              return (
                <div
                  onClick={() => setIsCommentVisible(true)}
                  className="flex justify-between items-center  p-[3%] max-[425px]:p-[2%] max-[425px]:text-[14px] border-b-[1px]"
                >
                  <img
                    className="h-[60px] aspect-square max-[425px]:h-[50px] max-[640px]:mr-[3%] object-cover rounded-[50%]"
                    src={user2}
                    alt=""
                  />
                  <div className="w-[75%] max-[800px]:w-[85%] max-[550px]:w-[84%] max-[450px]:w-[82%] max-[350px]:w-[81%] ">
                    <div className="flex justify-between mb-[2%]  ">
                      <h3 className="font-QBold">Jordyn</h3>
                      <h4 className="font-QRegular text-gray-500 ">
                        
                        10.00 AM
                      </h4>
                    </div>
                    <div className="flex justify-between font-QRegular text-gray-500">
                      <div className="w-[80%] text-line  text-left  h-[30px]  max-[425px]:h-[20px]" >
                     
                      {message.mes}
                       
                    
                      </div>
                      
                      <h3 className="bg-[#8735C8] text-white  h-[26px] max-[425px]:h-[22px] aspect-square rounded-[50%] font-QBold">
                        2
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white shadow-lg w-full max-h-screen overflow-y-scroll max-[800px]:hidden  ">
          <div className="flex justify-between items-center px-[1%] pb-[1%] pt-[2%] border-b-[1px]  bg-white z-10 fixed w-[67.9%] max-[1240px]:w-[59.4%] max-[960px]:w-[52.8%]">
            <div className="flex items-center font-QSemi">
              <img
                className="h-[60px] w-[60px] object-cover rounded-[50%] mr-[20%]"
                src={basil}
                alt=""
              />
              <h2>basil</h2>
            </div>
            <div className="flex justify-between w-[15%] max-[930px]:w-[25%] text-[22px]">
              <FontAwesomeIcon icon={faPhone} />
              <FontAwesomeIcon icon={faVideo} />
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
          </div>

          <div className="relative">
            <div
              onClick={() => setShowPicker(false)}
              className="absolute top-[100px] w-full p-[1%] "
            >
              {messages.map((message, index) =>
                message.source === "receiver" ? (
                  <div
                    key={index}
                    className="flex flex-col items-start font-QMedium"
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
                    className="flex flex-col items-end font-QMedium"
                  >
                    {/* Sender Message */}
                    <div className="bg-gray-100 p-3 mt-4 mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl items-end flex max-w-[75%]">
                      <h2 className="mr-2 text-left">{message.message}</h2>
                      <h3 className="text-gray-500">{message.time}</h3>
                    </div>
                  </div>
                )
              )}
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
                value={typing}
                onChange={(e) => setTyping(e.target.value)}
                className="w-[80%] outline-none font-QRegular text-[18px] "
                type="text"
                placeholder="Message..."
              />
              {typing ? (
                <button className="w-[15%] font-QBold text-[#8735C8] ">
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
      <AnimatePresence>
        {isCommentVisible && (
          <motion.div
            initial={{ x: 1500 }}
            animate={{ x: 0 }}
            exit={{ x: 1500 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <ChatBox onDataSend={handleDataFromChild} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Message;
