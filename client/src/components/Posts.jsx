import React, { useEffect, useState } from "react";
import user from "../images/user.png";
import user2 from "../images/IMG_6351.jpeg";
import user3 from "../images/IMG_5034.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faHeart,
  faCommentDots,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import feed from "../images/br.jpg";
import feed2 from "../images/IMG_8890.jpeg";
import feed3 from "../images/IMG_1515.jpeg";
import axios from "axios";
import Comments from "./Comments";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
const Posts = () => {
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

  const Post = [
    {
      img: user,
      name: "Shanib Jan",
      date: "12 April at 09:29 PM",
      desc: "Fitting perfectly? Fitting title cardsto actors 💀 ",
      like: "10",
      comment: "5",
      share: "7",
      post: feed,
    },
    {
      img: user2,
      name: "Anirudh ",
      date: "05 May at 09:29 PM",
      desc: "Take a look at our vision for the new desian conceot for cosmetics websitecalled Best Gow! @ Thanks for vour likes and comments ❤️",
      like: "156",
      comment: "53",
      share: "17",
      post: feed2,
    },
    {
      img: user3,
      name: "Jaffer_xasons ",
      date: "05 Dec at 09:29 PM",
      desc: "Take a look at our vision for the new desian  comments ❤️",
      like: "356",
      comment: "153",
      share: "17",
      post: feed3,
    },
  ];
  return (
    <div className="relative">
      <div className=" w-[90%] m-[5%] top-[95px] bg-[#FAFAFA] p-[3%] rounded-[10px]">
        <div className="px-[10%] py-[2%] bg-white rounded-[10px] shadow-lg">
          <div className="flex justify-between pb-[3%] border-b-[1px] ">
            <div className="h-[60px]">
              <img className="h-full" src={user} alt="" />
            </div>
            <input
              className="w-[93%] px-[3%] bg-gray-100 font-QRegular outline-none rounded-[20px]"
              type="text"
              placeholder="What do you want to share today..!"
            />
          </div>
          <div className="flex justify-between mt-[3%]">
            <div className="file-input w-[13%] flex justify-between items-center">
              <input type="file" id="file" class="file" />
              <FontAwesomeIcon className="text-orange-400" icon={faImage} />
              <label className="cursor-pointer font-QSemi " for="file">
                Photo/Video
              </label>
            </div>

            <button className="bg-[#8735C8] font-QSemi text-white px-[5%] py-[1%] rounded-[20px] ">
              Post
            </button>
          </div>
        </div>

        <div className="my-[6%] grid grid-cols-2 gap-[2%] max-[850px]:grid-cols-1">
          {Post.map((item) => {
            return (
              <div className="bg-white shadow-lg   p-[3%] rounded-[20px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center w-[70%]">
                    <img
                      className="h-[60px] w-[60px] object-cover rounded-[50%]"
                      src={item.img}
                      alt=""
                    />
                    <div className="text-start ml-[5%]">
                      <h1 className="font-QSemi">{item.name}</h1>
                      <p className="font-QRegular text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      className="text-gray-500"
                      icon={faEllipsis}
                    />
                  </div>
                </div>
                <div>
                  <div className="my-[4%]">
                    <p className=" text-left font-QMedium">{item.desc}</p>
                  </div>

                  <img
                    className="rounded-[20px] w-full h-[568px] object-cover "
                    src={item.post}
                    alt=""
                  />
                </div>
                <div className="mx-[1%] mt-[4%]">
                  <div className="flex justify-between font-QSemi pb-[2%] border-b-[1px] ">
                    <div className="flex justify-between w-[40%]">
                      <p>{item.like} Likes</p>
                      <p>•</p>
                      <p>{item.comment} Comments</p>
                    </div>
                    <div>
                      <p>{item.share} Shares</p>
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
            );
          })}
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

export default Posts;
