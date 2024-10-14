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

const Message = () => {
  const [message, setMessage] = useState("");

  const messages = [
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
    {
      img: user2,
      name: "Jordyn",
      time: "10.00 AM",
      mes: "hai,how do u do..!",
      count: "2",
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  //   const [inputValue, setInputValue] = useState("");
  // const [showPicker, setShowPicker] = useState(false);

  // // Handle emoji selection
  // const onEmojiClick = (emojiData) => {
  //   setInputValue((prevInput) => prevInput + emojiData.emoji); // Correct emoji property
  //   setShowPicker(false); // Hide emoji picker after selection
  // };
  // <div style={{ padding: "20px" }}>
  //     <h2>Emoji Selector Example</h2>

  //     {/* Text input field */}
  //     <input
  //       type="text"
  //       value={inputValue}
  //       onChange={(e) => setInputValue(e.target.value)}
  //       placeholder="Type a message"
  //       style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
  //     />

  //     {/* Button to toggle emoji picker */}
  //     <button onClick={() => setShowPicker(!showPicker)}>
  //       {showPicker ? "Close Emoji Picker" : "Open Emoji Picker"}
  //     </button>

  //     {/* Display emoji picker when `showPicker` is true */}
  //     {showPicker && (
  //       <div>
  //         <EmojiPicker onEmojiClick={onEmojiClick} />
  //       </div>
  //     )}
  //   </div>

  return (
    <div className="absolute  w-full">
      <div className="flex px-[5%] ">
        <div className="w-[40%] max-h-screen overflow-y-scroll mr-[1%] py-[2%] ">
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
            {messages.map((message) => {
              return (
                <div className="flex justify-between items-center my-[3%] p-[3%] border-b-[1px]">
                  <img
                    className="h-[60px] w-[60px] object-cover rounded-[50%]"
                    src={user2}
                    alt=""
                  />
                  <div className="w-[75%] ">
                    <div className="flex justify-between mb-[4%] ">
                      <h3 className="font-QBold">Jordyn</h3>
                      <h4 className="font-QRegular text-gray-500 ">
                        {" "}
                        10.00 AM
                      </h4>
                    </div>
                    <div className="flex justify-between font-QRegular text-gray-500">
                      <h5>Thank you for everything..!</h5>
                      <h3 className="bg-[#8735C8] text-white px-[3%] rounded-[50%] font-QBold">
                        2
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white shadow-lg w-full max-h-screen overflow-y-scroll  ">
          <div className="flex justify-between items-center px-[1%] pb-[1%] pt-[2%] border-b-[1px]  bg-white z-10 fixed w-[63.7%]">
            <div className="flex items-center font-QSemi">
              <img
                className="h-[60px] w-[60px] object-cover rounded-[50%] mr-[20%]"
                src={basil}
                alt=""
              />
              <h2>basil</h2>
            </div>
            <div className="flex justify-between w-[15%] text-[22px]">
              <FontAwesomeIcon icon={faPhone} />
              <FontAwesomeIcon icon={faVideo} />
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-[100px] w-full ">
              <div className="flex flex-col  items-end font-QMedium">
                <div className="bg-gray-100 p-3 mt-4 mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl items-end flex max-w-[75%]">
                  <h2 className="mr-2 text-left ">hffffai</h2>
                  <h3 className="text-gray-500">12:54</h3>
                </div>
              </div>

              <div className="flex flex-col  items-start font-QMedium">
                <div className="bg-gray-100 p-3 mt-4 ml-2 rounded-br-3xl rounded-tl-3xl rounded-tr-xl items-end flex max-w-[75%]">
                  <h2 className="mr-2 text-left ">hfffgjhhgghfhgfhfgfai</h2>
                  <h3 className="text-gray-500">12:54</h3>
                </div>
              </div>

              <div className="flex flex-col  items-start font-QMedium">
                <div className="bg-gray-100 p-3 mt-4 ml-2 rounded-br-3xl rounded-tl-3xl rounded-tr-xl items-end flex max-w-[75%]">
                  <h2 className="mr-2 text-left ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam facere necessitatibus assumenda possimus, eos minus quasi asperiores veniam eum exercitationem commodi aliquam omnis sapiente sit at officiis. Velit, eum ad.</h2>
                  <h3 className="text-gray-500">12:54</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="px-[1%] pb-[1%] fixed bottom-0 w-[63.7%] bg-white">
            <div className=" flex justify-between items-center text-[20px] h-[50px] text-gray-500 px-[1%]  bg-white z-10  rounded-[30px] border-[1px]">
              <FontAwesomeIcon icon={faFaceSmile} />
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-[80%] outline-none font-QRegular text-[18px] "
                type="text"
                placeholder="Message..."
              />
              {message ? (
                <button className="w-[15%] font-QBold text-[#8735C8] ">
                  send
                </button>
              ) : (
                <div className="w-[15%] flex justify-between p-[1%]">
                  <FontAwesomeIcon icon={faMicrophone} />
                  <FontAwesomeIcon icon={faImage} />
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
