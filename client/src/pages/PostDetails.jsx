import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import user2 from "../images/IMG_6351.jpeg";
import feed2 from "../images/IMG_8890.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCommentDots,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import feed from "../images/br.jpg";
import feed3 from "../images/IMG_1515.jpeg";

const PostDetails = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Run this effect whenever the route path changes

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
    <div className="absolute top-[120px] w-full">
      <NavBar />
      <div className="flex px-[5%]">
        <div className="w-[30%] max-h-[1056px] overflow-y-scroll mr-[6%]">
          <div className="flex justify-center items-center pb-[20%] pt-[2%] border-t-[2px] text-gray-500  ">
            <FontAwesomeIcon className="mr-[1%]" icon={faTableCells} />
            <h2 className="font-QSemi ml-[1%] ">POSTS</h2>
          </div>
          <div className="grid gap-7">
            <div>
              <img
                className="  w-full object-cover aspect-square rounded-[20px] "
                src={feed2}
                alt=""
              />
            </div>
            <div>
              <img
                className="  w-full object-cover aspect-square rounded-[20px] "
                src={feed3}
                alt=""
              />
            </div>
            <div>
              <img
                className="  w-full object-cover aspect-square rounded-[20px] "
                src={feed}
                alt=""
              />
            </div>
            <div>
              <img
                className="  w-full object-cover aspect-square rounded-[20px] "
                src={feed2}
                alt=""
              />
            </div>
            <div>
              <img
                className="  w-full object-cover aspect-square rounded-[20px] "
                src={feed3}
                alt=""
              />
            </div>
            <div>
              <img
                className="  w-full object-cover aspect-square rounded-[20px] "
                src={feed}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg w-full   py-[3%] px-[10%] rounded-[20px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-[70%]">
              <img
                className="h-[60px] w-[60px] object-cover rounded-[50%]"
                src={user2}
                alt=""
              />
              <div className="text-start ml-[5%]">
                <h1 className="font-QSemi">shanib__jan</h1>
                <p className="font-QRegular text-gray-500">
                  12 April at 09:29 PM
                </p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon className="text-gray-500" icon={faEllipsis} />
            </div>
          </div>
          <div>
            <div className="my-[4%]">
              <p className=" text-left font-QMedium">
                Take a look at our vision for the new desian conceot for
                cosmetics websitecalled Best Gow! @ Thanks for vour likes and
                comments ❤️
              </p>
            </div>

            <img
              className="rounded-[20px] w-full h-full aspect-square object-cover "
              src={feed2}
              alt=""
            />
          </div>
          <div className="mx-[1%] mt-[4%]">
            <div className="flex justify-between font-QSemi pb-[2%] border-b-[1px] ">
              <div className="flex justify-between w-[30%]">
                <p>355 Likes</p>
                <p>•</p>
                <p>34 Comments</p>
              </div>
              <div>
                <p>15 Shares</p>
              </div>
            </div>

            <div className="flex justify-between mt-[2%] text-[25px]">
              <div className="flex w-[25%] justify-between cursor-pointer">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon
                  onClick={() => setIsCommentVisible(true)}
                  icon={faCommentDots}
                />
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isCommentVisible && (
          <div className="overlay">
            <div className=" overlay-content fixed w-full bottom-0">
              <motion.div
                initial={{ y: 1000 }}
                animate={{ y: 0 }}
                exit={{ y: 1000 }}
                transition={{ duration: 0.5 }}
              >
                <Comments onDataSend={handleDataFromChild} />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default PostDetails;