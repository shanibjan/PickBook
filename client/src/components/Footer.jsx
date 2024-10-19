import {
  faBell,
  faMessage,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import user from "../images/user.png";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notifications";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const nav=useNavigate()
  const a=["abcd efg"]
  console.log(a[0].length);
  
  
  
  
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };
  

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);

  return (
    <div>
      <div className=" fixed bottom-0 w-full bg-white px-[5%] py-[2%] hidden max-[800px]:flex justify-between ">
        <div className="h-[25px] max-[500px]:h-[20px]">
          <FontAwesomeIcon icon={faSquarePlus} className="w-full h-full" />
        </div>
        <div onClick={()=>nav('/message')} className="h-[25px] max-[500px]:h-[20px] ">
          <FontAwesomeIcon icon={faMessage} className="w-full h-full" />
        </div>
        <div className="h-[25px] max-[500px]:h-[20px] ">
          <FontAwesomeIcon
            onClick={() => setIsCommentVisible(true)}
            icon={faBell}
            className="w-full h-full"
          />
        </div>
        <div className="h-[25px] max-[500px]:h-[20px] ">
          <img className="h-full" src={user} alt="" />
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
