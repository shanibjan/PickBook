import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import userProfile from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faMessage,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("pickbook-user"));

  const userId = user ? user._id : null;
  const userName = user ? user.name : null;
  
 const [profiledata, setProfileData] = useState([]);
 const[post,setPost]=useState([])



const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/v1/user/get-profile/${userId}`);
      if (res) {
        setProfileData(res.data);
      } else {
        setProfileData([]);
      }
    } catch (error) {}
  };


  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/v1/user/get-posts/${userId}`);
      if (res) {
        setPost(res.data);
      } else {
        setPost([]);
      }
    } catch (error) {}
  };
  const nav = useNavigate();
  

  useEffect(() => {
    fetchProfile();
    fetchPost()
  }, []);
 
  return (
    <div className="absolute top-[70px] w-full">
      {user ? (
        <div>
          <NavBar />
          <div className="mx-[5%] max-[425px]:mx-[2%] bg-[#FAFAFA] p-[3%] max-[850px]:px-[4%] max-[420px]:px-[2%] rounded-[20px]">
            <div className="bg-white px-[10%] max-[1035px]:px-[5%] py-[3%] shadow-lg rounded-[20px]">
              <div className="flex justify-between  ">
                <div className="flex  items-center w-[30%] ">
                  {profiledata.length>0?  <img
                    className="h-[250px] aspect-square rounded-[50%] object-cover shadow-lg max-[1245px]:h-[200px]  max-[1000px]:h-[150px]  max-[850px]:h-[100px]  max-[650px]:h-[70px] max-[360px]:h-[60px]   "
                    src={profiledata[0].image}
                    alt=""
                  />:<img
                  className="h-[250px] aspect-square rounded-[50%] object-cover shadow-lg max-[1245px]:h-[200px]  max-[1000px]:h-[150px]  max-[850px]:h-[100px]  max-[650px]:h-[70px] max-[360px]:h-[60px]   "
                  src={userProfile}
                  alt=""
                />}
                  
                </div>
                <div className="w-[70%] max-[1000px]:w-[90%] max-[850px]:w-full max-[425px]:w-[80%]">
                  <div className="flex justify-between items-center">
                    <h1 className="font-QBold text-[22px] max-[425px]:text-[15px]">
                      {userName}
                    </h1>
                    <div className=" flex justify-between w-[60%] max-[750px]:hidden">
                      <button onClick={()=>nav('/edit-profile')} className="bg-[#8735C8] font-QSemi text-white px-[9%] max-[900px]:px-[6%] py-[4%] rounded-[10px] shadow-md ">
                      Edit Profile
                      </button>
                      <button className="bg-gray-400 font-QSemi text-white px-[9%]  max-[900px]:px-[6%] py-[4%] rounded-[10px] shadow-md ">
                      Share profile
                      </button>
                    </div>

                    <div className="dropdown">
                      <FontAwesomeIcon icon={faEllipsis} />

                      <ul className="dropdown-menu text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[1000px]:left-[-80px] max-[550px]:text-[11px] max-[500px]:left-[-110px] max-[1000px]:w-[150px] ">
                        <li className="font-QSemi"
                          onClick={() => {
                            localStorage.removeItem("pickbook-user");
                            localStorage.removeItem("pickbook-token");
                            nav("/login");
                          }}
                        >
                          {"Logout"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-between font-QSemi text-[20px] max-[425px]:text-[15px] my-[5%] w-[97%]">
                    <div className="flex max-[650px]:grid ">
                      <h1 className="mr-[12%]">{post?post.length:0}</h1>
                      <p className="max-[500px]:text-[12px]">Posts</p>
                    </div>

                    <div className="flex max-[650px]:grid">
                      <h1 className="mr-[12%]">104</h1>
                      <p className="max-[500px]:text-[12px]">Followers</p>
                    </div>
                    <div className="flex max-[650px]:grid">
                      <h1 className="mr-[12%]">134</h1>
                      <p className="max-[500px]:text-[12px]">Following</p>
                    </div>
                  </div>
                  <div className="max-[750px]:hidden">
                    <div className="font-QSemi text-start">
                      <h2>{profiledata.length>0?profiledata[0].bio:null}</h2>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className=" hidden max-[540px]:text-[12px] max-[750px]:block">
                <div className="font-QSemi text-start my-[6%]">
                <h2>{profiledata.length>0?profiledata[0].bio:null}</h2>
                </div>

                <div className="flex">
                  <button  onClick={()=>nav('/edit-profile')} className="bg-gray-400 font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] mr-[7%]">
                    Edit Profile
                  </button>
                  <button className="bg-gray-400 font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] ">
                    Share profile
                  </button>
                </div>
              </div>
            </div>

            <div className="my-[5%]">
              <div className="flex justify-center items-center pb-[4%] pt-[2%] border-t-[2px] text-gray-500  ">
                <FontAwesomeIcon className="mr-[1%]" icon={faTableCells} />
                <h2 className="font-QSemi ml-[1%] ">POSTS</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-[10%] ">
                {post.map((post) => {
                  return (
                    <div
                      onClick={() => nav("/post")}
                      className="relative group cursor-pointer"
                    >
                      <img
                        className="w-full h-full max-[425px]:rounded-[7px] aspect-square object-cover rounded-[20px] shadow-md transition duration-300 group-hover:brightness-50"
                        src={post.image}
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
        </div>
      ) : (
       <Login/>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
