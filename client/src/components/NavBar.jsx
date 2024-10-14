import React, { useEffect, useState } from "react";
import logo from "../images/—Pngtree—the letter p on a_15885322.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import user from "../images/user.png";
import Comments from "./Comments";
import { motion,AnimatePresence } from "framer-motion";
import Notification from "./Notifications";
const NavBar = () => {
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
    <div>
        <div className="flex justify-between text-gray-700 items-center px-[5%] fixed w-full z-10 bg-white top-0">
      <div className="flex justify-start items-center w-[20%]">
        <div className="h-[80px] w-[80px] ">
          <img className="h-full w-full" src={logo} alt="" />
        </div>
        <div>
          <h1 className="font-QBold text-[35px]">PickBook</h1>
        </div>
      </div>
      <div className="flex justify-between w-[50%] bg-gray-100 py-[1%] px-[2%] rounded-[20px]" >
        <div  className="w-[70%]" >
          <input className="bg-gray-100 w-full font-QRegular outline-none" placeholder="Search User" type="text" />
        </div>
        <div className="h-[18px] text-gray-400" >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-full h-full" />
        </div>
      </div>
      <div className="flex justify-between w-[20%] max-[800px]:hidden" >  
        <div className="h-[25px]" >
          <FontAwesomeIcon icon={faSquarePlus} className="w-full h-full" />
        </div>
        <div className="h-[25px]" >
          <FontAwesomeIcon icon={faMessage} className="w-full h-full" />
        </div>
        <div className="h-[25px]"  onClick={() => setIsCommentVisible(true)} >
          <FontAwesomeIcon icon={faBell} className="w-full h-full" />
        </div>
        <div className="h-[25px]" >
          <img className="h-full" src={user} alt="" />
        </div>
      </div>
    </div>

    <AnimatePresence>
      {isCommentVisible && (
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
      )}
      </AnimatePresence>
    
    </div>
    
  );
};

export default NavBar;
