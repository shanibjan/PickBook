import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import loading from "../images/buffering-colors.gif";

import axios from "axios";

const Notification = ({ onDataSend }) => {
  const [hide, setHide] = useState(true);
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
  const [noti, setNoti] = useState([]);
  const userId = user ? user._id : null;
  const [isLoading, setIsLoading] = useState(true);
  
  
  
  const fetchNoti = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-notification/${userId}`
      );

      setNoti([...res.data.like, ...res.data.follow]);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  noti && noti.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  useEffect(() => {
    onDataSend(hide);
  }, [hide]);

  
  useEffect(() => {
    fetchNoti();
  }, []);

  return (
    <div className="dd fixed bottom-0 left-0 right-0 z-10 h-screen bg-[#FAFAFA] mx-[5%] max-[425px]:mx-[2%] overflow-y-scroll rounded-t-[20px] max-[550px]:rounded-t-[10px]  shadow-lg">
      <div className="flex justify-between fixed w-[84%] max-[425px]:w-[90%] text-[25px] mx-[3%] mb-[3%] z-[1] bg-[#FAFAFA] p-[3%] items-center max-[550px]:text-[20px] ">
        <h1 className="w-full font-QSemi">Notifications</h1>
        <FontAwesomeIcon
          onClick={() => setHide(false)}
          className="absolute right-0 cursor-pointer"
          icon={faXmark}
        />
      </div>
      {isLoading ? (
        <div className="h-[400px] max-[450px]:h-[300px] absolute z-10 w-full top-[90px]">
          <img
            src={loading}
            alt=""
            className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]"
          />
        </div>
      ) : null}
      {noti.length>0?
      <div className="absolute top-[85px] w-full">
        
         { noti.map((not) => {
          
            
            return not.post ? (
              <div className="flex items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]">
                <img
                  className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%] mr-[3%]"
                  src={not.likedUserProfileId.image}
                  alt=""
                />
                <div className="text-left w-[90%] flex justify-between  max-[540px]:text-[13px] max-[425px]:text-[12px] items-center">
                  <div className="flex w-[60%] max-[400px]:w-[80%]" >
                    <h2 className="font-QSemi max-[500px]:font-QMedium mr-[3%] ">
                      {not.likedUser} 
                    </h2>
                    <p className="font-QRegular" >liked your post</p>
                  </div>

                  <img
                    className="w-[100px] max-[550px]:w-[75px] max-[400px]:w-[55px] object-cover aspect-square rounded-[10px] max-[425px]:rounded-[4px]"
                    src={not.post}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="flex  items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]">
                <img
                  className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%] mr-[3%]"
                  src={not.followerProfileId.image}
                  alt=""
                />
                <div className="text-left w-[90%] flex justify-between max-[540px]:text-[13px] max-[425px]:text-[12px]  items-center">
                  
                  <div className="flex w-[60%] max-[400px]:w-[80%]" >
                    <h2 className="font-QSemi max-[500px]:font-QMedium mr-[3%] ">
                      {not.follower} 
                    </h2>
                    <p className="font-QRegular" > started following you</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>:isLoading===false?(<div className="font-QSemi my-[4%] h-[150px] flex justify-center items-center" >
        <h1>No notifications yet</h1>
      </div>):null}
    </div>
  );
};

export default Notification;
