import { faArrowLeft, faChevronCircleLeft, faChevronLeft, faCircleInfo, faMicrophone, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import basil from "../images/basil.jpg";
import EmojiPicker from 'emoji-picker-react';
import { faFaceSmile, faHeart, faImage } from '@fortawesome/free-regular-svg-icons';

const ChatBox = ({onDataSend }) => {
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

      const [showPicker, setShowPicker] = useState(false);
      const [typing, setTyping] = useState("");
      const onEmojiClick = (emojiData) => {
        setTyping((prevInput) => prevInput + emojiData.emoji); // Correct emoji property
        // Hide emoji picker after selection
      };
      const[hide,setHide]=useState(true)
   
   
      useEffect(()=>{
        onDataSend(hide)
      },[hide])
  return (
    <div className='hidden max-[800px]:block fixed bottom-0 left-0 right-0 z-10 h-screen  mx-[5%] max-[425px]:mx-[2%] overflow-y-scroll rounded-t-[20px] max-[550px]:rounded-t-[10px] shadow-lg' >
     <div  className="bg-white shadow-lg w-full max-h-screen overflow-y-scroll   ">
          <div className="flex justify-between items-center px-[1%] pb-[1%] pt-[2%] border-b-[1px]  bg-white z-10 fixed w-[90%] max-[425px]:w-[96%]  ">
            <div className="flex items-center font-QSemi max-[425px]:text-[15px]">
              <FontAwesomeIcon onClick={()=>setHide(false)} className='mr-[10%] text-[22px] max-[425px]:text-[15px]' icon={faArrowLeft} />
              <img
                className="h-[60px] aspect-square max-[425px]:h-[50px] object-cover rounded-[50%] mr-[20%]"
                src={basil}
                alt=""
              />
              <h2   >basil</h2>
            </div>
            <div className="flex justify-between w-[15%] max-[930px]:w-[25%] text-[22px] max-[425px]:text-[15px]">
              <FontAwesomeIcon icon={faPhone} />
              <FontAwesomeIcon icon={faVideo} />
              <FontAwesomeIcon icon={faCircleInfo} />
            </div>
          </div>

          <div className="">
            <div onClick={()=>setShowPicker(false)} className=" top-[100px] my-[16%] max-[425px]:text-[12px] w-full p-[1%] ">
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

          <div className="px-[1%] pb-[1%] fixed bottom-0 w-[90%] max-[425px]:w-[96%] bg-white">
            <div className=" flex justify-between items-center text-[20px] h-[50px] text-gray-500 px-[1%]  bg-white z-10  rounded-[30px] border-[1px]">
              {showPicker && (
                <div className="absolute bottom-[64px] w-[95%]" >
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
  );
};

export default ChatBox;