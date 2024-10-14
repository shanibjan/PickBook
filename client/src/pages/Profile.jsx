import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import userProfile from "../images/IMG_6351.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faMessage,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import feed from "../images/br.jpg";
import feed2 from "../images/IMG_8890.jpeg";
import feed3 from "../images/IMG_1515.jpeg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const posts = [{ src: feed }, { src: feed2 }, { src: feed3 }];
 
  const nav=useNavigate()
  return (
    <div className="absolute top-[120px] w-full">
      <NavBar />
      <div className="mx-[5%] bg-[#FAFAFA] p-[3%] max-[850px]:px-[10%] rounded-[20px]">
        <div className="bg-white px-[10%] py-[3%] shadow-lg rounded-[20px]">
          <div className="flex justify-between  ">
            <div className="flex  items-center w-[30%] ">
              <img
                className="h-[250px] w-[250px] rounded-[50%] object-cover shadow-lg max-[1245px]:h-[200px] max-[1245px]:w-[200px] max-[1000px]:h-[150px] max-[1000px]:w-[150px] max-[850px]:h-[100px] max-[850px]:w-[100px] max-[650px]:h-[70px] max-[650px]:w-[70px]  "
                src={userProfile}
                alt=""
              />
            </div>
            <div className="w-[70%]">
              <div className="flex justify-between items-center">
                <h1 className="font-QSemi text-[22px]">shanib_jaan__</h1>
                <div className=" flex justify-between w-[60%] max-[700px]:hidden">
                  <button className="bg-[#8735C8] font-QSemi text-white px-[10%] py-[4%] rounded-[10px] shadow-md ">
                   Edit profile
                  </button>
                  <button className="bg-gray-400 font-QSemi text-white px-[10%] py-[4%] rounded-[10px] shadow-md ">
                    View archieve
                  </button>
                </div>

                <FontAwesomeIcon icon={faEllipsis} />
              </div>
              <div className="flex justify-between font-QSemi text-[20px] my-[5%]">
                <h1>10 Posts</h1>
                <h1>256 Followers</h1>
                <h1>35 Following</h1>
              </div>
              <div className="max-[700px]:hidden">
                <div className="font-QSemi text-start">
                  <h2>Entrepreneur</h2>
                  <h2>📍Bangalore</h2>
                  <h2>@colin__guest</h2>
                  <h2> 🇨🇳🇧🇩🇭🇰</h2>
                </div>
               
              </div>
            </div>
          </div>
          <div className=" hidden max-[700px]:block">
            <div className="font-QSemi text-start">
              <h2>Entrepreneur</h2>
              <h2>📍Bangalore</h2>
              <h2>@colin__guest</h2>
              <h2> 🇨🇳🇧🇩🇭🇰</h2>
            </div>
            <div className="flex font-QMedium  my-[3%]">
              <p className="text-gray-500 mr-[1%]">Followed by </p>
              <p className="font-QSemi">abrham_m ,</p>
              <p className="font-QSemi">kennedy_jon</p>
              <p className="text-gray-500 ml-[1%]">and 55 more</p>
            </div>
            <div className="flex">
              <button className="bg-[#8735C8] font-QSemi text-white px-[5%] py-[1%] rounded-[10px] mr-[7%]">
                Edit profile
              </button>
              <button className="bg-gray-400 font-QSemi text-white px-[5%] py-[1%] rounded-[10px] ">
                View archive
              </button>
            </div>
          </div>
        </div>

        <div className="my-[5%]">
          <div className="flex justify-center items-center pb-[4%] pt-[2%] border-t-[2px] text-gray-500  ">
            <FontAwesomeIcon className="mr-[1%]" icon={faTableCells} />
            <h2 className="font-QSemi ml-[1%] ">POSTS</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 ">
            {posts.map((post) => {
              return (
                <div onClick={()=>nav('/post')} className="relative group cursor-pointer">
                  <img
                    className="w-full h-full aspect-square object-cover rounded-[20px] shadow-md transition duration-300 group-hover:brightness-50"
                    src={post.src}
                    alt=""
                  />
                  <div className="hidden group-hover:flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 text-white font-QSemi text-[20px]">
                    <FontAwesomeIcon icon={faHeart} />
                    <h3 className="mr-[2%]">50</h3>
                    <FontAwesomeIcon className="ml-[2%]" icon={faMessage} />
                    <h3>8</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
