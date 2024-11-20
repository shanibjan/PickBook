import {
  faBell,
  faMessage,
  faSquarePlus,
  
} from "@fortawesome/free-regular-svg-icons";
import logo from "../images/—Pngtree—the letter p on a_15885322.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import userimg from "../images/user.png";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const nav = useNavigate();
  const [profiledata, setProfileData] = useState([]);

  const user = JSON.parse(localStorage.getItem("pickbook-user"));

  const userId = user ? user._id : null;
  const userName = user ? user.name : null;

  const [isCommentVisible, setIsCommentVisible] = useState(false);
 
  
  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://pickbook-media.onrender.com/api/v1/user/get-profile-for-users/${userName}`);
      if (res) {
        setProfileData(res.data.profile);
      } else {
        setProfileData([]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);

  return (
    <div>
      <div className=" fixed bottom-0 w-full bg-white px-[5%] py-[2%] items-center hidden max-[800px]:flex justify-between ">
      <div onClick={()=>nav('/')} className="h-[35px] w-[35px] max-[500px]:h-[30px] max-[500px]:w-[30px]">
        <img src={logo} alt="" className="w-full h-full" />
          
        </div>
        
        <div className="h-[25px] w-[25px] max-[500px]:h-[20px]  max-[500px]:w-[20px]">
          <FontAwesomeIcon icon={faSquarePlus} className="w-full h-full" />
        </div>
        <div
          onClick={() => nav(`/message/${userId}`)}
          className="h-[25px] w-[25px] max-[500px]:h-[20px]  max-[500px]:w-[20px] "
        >
          <FontAwesomeIcon icon={faMessage} className="w-full h-full" />
        </div>
        <div className="h-[25px] w-[25px] max-[500px]:h-[20px]  max-[500px]:w-[20px] ">
          <FontAwesomeIcon
            onClick={() => setIsCommentVisible(true)}
            icon={faBell}
            className="w-full h-full"
          />
        </div>
        <div
          onClick={()=>nav(`/user/${userName}`)}
          className="h-[25px] w-[25px] max-[500px]:h-[20px]  max-[500px]:w-[20px] "
        >
          {profiledata? (
            <img
              className="h-full w-full aspect-square rounded-[50%]"
              src={profiledata.image}
              alt=""
            />
          ) : (
            <img className="h-full w-full" src={userimg} alt="" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isCommentVisible ? (
          <div className="overlay">
            <div className=" overlay-content fixed w-full bottom-0">
              <motion.div
                initial={{ x: 1500 }}
                animate={{ x: 0 }}
                exit={{ x: 1500 }}
                transition={{ duration: 0.5 }}
              >
                <Notification onDataSend={handleDataFromChild} />
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Footer;
