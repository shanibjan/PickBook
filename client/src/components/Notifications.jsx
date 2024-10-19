import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import feed2 from "../images/IMG_8890.jpeg";
import user2 from "../images/IMG_6351.jpeg";

const Notification = ({ onDataSend }) => {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    onDataSend(hide);
  }, [hide]);

  const notification = [
    { follwer: "shanib", src: feed2, noti: "post" },
    { follwer: "akhil", src: feed2, noti: "follow" },
    { follwer: "sabu_08", src: feed2, noti: "post" },
    { follwer: "shanib", src: feed2, noti: "follow" },
    { follwer: "shanib", src: feed2, noti: "post" },
    { follwer: "shanib", src: feed2, noti: "post" },
  ];

  return (
    <div className="dd fixed bottom-0 left-0 right-0 z-10 h-screen bg-[#FAFAFA] mx-[5%] max-[425px]:mx-[2%] overflow-y-scroll rounded-t-[20px] max-[550px]:rounded-t-[10px]  shadow-lg">
      <div className="flex justify-between fixed w-[84%] text-[25px] mx-[3%] mb-[3%] z-[1] bg-[#FAFAFA] p-[3%] items-center max-[550px]:text-[20px] ">
        <h1 className="w-full font-QSemi">Notifications</h1>
        <FontAwesomeIcon
          onClick={() => setHide(false)}
          className="absolute right-0 cursor-pointer"
          icon={faXmark}
        />
      </div>
      <div className="absolute top-[85px] w-full">
        {notification.map((noti, index) =>
          noti.noti === "post" ? (
            <div className="flex items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]">
          <img
            className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%] mr-[3%]"
            src={user2}
            alt=""
          />
          <div className="text-left w-[90%] flex justify-between  max-[540px]:text-[13px] max-[425px]:text-[12px] items-center">
            <h2 className="font-QSemi max-[500px]:font-QMedium  ">
              {noti.follwer} liked your post
            </h2>
            <img
              className="w-[100px] max-[550px]:w-[75px] max-[400px]:w-[55px] object-cover aspect-square rounded-[10px] max-[425px]:rounded-[4px]"
              src={feed2}
              alt=""
            />
          </div>
        </div>
          ) : (
            <div className="flex  items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]">
          <img
            className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%] mr-[3%]"
            src={user2}
            alt=""
          />
          <div className="text-left w-[90%] flex justify-between max-[540px]:text-[13px] max-[425px]:text-[12px]  items-center">
            <h2 className="font-QSemi max-[500px]:font-QMedium ">
              {noti.follwer} started following you
            </h2>
            <button className="bg-[#8735C8] font-QSemi text-white px-[6%] py-[1%] rounded-[10px] max-[425px]:rounded-[4px] shadow-md ">
              Follow
            </button>
          </div>
        </div>
          )
        )}
        
      </div>
    </div>
  );
};

export default Notification;
