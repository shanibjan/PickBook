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

import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

const UserProfile = () => {
  const { pickBookUserName } = useParams();

  const [profiledata, setProfileData] = useState();
  const [selfProfiledata, setSelfProfileData] = useState();
  const [userDetails, setUserDetails] = useState();
  const [post, setPost] = useState([]);
  const [allComment, setAllComment] = useState([]);
const[followers,setFollowers]=useState([])
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
  const userId = user ? user._id : null;
  const userName = user ? user.name : null;
console.log(userId);



 
post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const fetchComment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-all-comments`
      );
      if (res) {
        setAllComment(res.data);
      } else {
        setAllComment([]);
      }
    } catch (error) {}
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-profile-for-users/${pickBookUserName}`
      );
      if (res) {
        setProfileData(res.data.profile);
        setUserDetails(res.data.userDetails);
        setFollowers(res.data.followers)
      } else {
        setProfileData();
      }
    } catch (error) {}
  };

  const fetchSelfProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-profile-for-users/${userName}`
      );
      if (res) {
        setSelfProfileData(res.data.profile);
      } else {
        setSelfProfileData();
      }
    } catch (error) {}
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-posts-for-users/${pickBookUserName}`
      );
      if (res) {
        setPost(res.data);
      } else {
        setPost([]);
      }
    } catch (error) {}
  };

  const follow = async()=>{
    try {
      const res=await axios.post('http://localhost:7000/api/v1/user/follow',{followerId:userId,followingId:userDetails._id})
      fetchProfile()
      
      const response=await axios.post('http://localhost:7000/api/v1/user/noti-follow',{followerProfileId:selfProfiledata._id,follower:userName,following:userDetails._id})
      console.log(response.data);
      

      
    } catch (error) {
      console.log(error);
      
    }
  }

  const unfollow = async()=>{
    try {
      const res=await axios.post('http://localhost:7000/api/v1/user/unfollow',{followerId:userId,followingId:userDetails._id})
      fetchProfile()
     

      const response=await axios.post('http://localhost:7000/api/v1/user/noti-unfollow',{unfollower:userName,postUser:userDetails._id})
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchPost();
    fetchProfile();
    fetchComment();
    fetchSelfProfile()
  }, []);

  useEffect(() => {
    fetchPost();
    fetchProfile();
    fetchComment();
  }, [pickBookUserName]);
  return (
    <div className="absolute top-[70px] w-full">
      {user ? (
        <div>
          <NavBar />
          <div className="mx-[5%] max-[425px]:mx-[2%] bg-[#FAFAFA] p-[3%] max-[850px]:px-[4%] max-[420px]:px-[2%] rounded-[20px]">
            <div className="bg-white px-[10%] max-[1035px]:px-[5%] py-[3%] shadow-lg rounded-[20px]">
              <div className="flex justify-between  ">
                <div className="flex  items-center w-[30%] ">
                  {profiledata ? (
                    <img
                      className="h-[250px] aspect-square rounded-[50%] object-cover shadow-lg max-[1245px]:h-[200px]  max-[1000px]:h-[150px]  max-[850px]:h-[100px]  max-[650px]:h-[70px] max-[360px]:h-[60px]   "
                      src={profiledata.image}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-[250px] aspect-square rounded-[50%] object-cover shadow-lg max-[1245px]:h-[200px]  max-[1000px]:h-[150px]  max-[850px]:h-[100px]  max-[650px]:h-[70px] max-[360px]:h-[60px]   "
                      src={userProfile}
                      alt=""
                    />
                  )}
                </div>
                <div className="w-[70%] max-[1000px]:w-[90%] max-[850px]:w-full max-[425px]:w-[80%]">
                  <div className="flex justify-between items-center">
                    <h1 className="font-QBold text-[22px] max-[425px]:text-[15px]">
                      {userDetails && userDetails.name}
                    </h1>
                    {pickBookUserName === userName ? (
                      <div className=" flex justify-between w-[60%] max-[750px]:hidden">
                        <button
                          onClick={() => nav("/edit-profile")}
                          className="bg-[#8735C8] font-QSemi text-white px-[9%] max-[900px]:px-[6%] py-[4%] rounded-[10px] shadow-md "
                        >
                          Edit Profile
                        </button>
                        <button className="bg-gray-400 font-QSemi text-white px-[9%]  max-[900px]:px-[6%] py-[4%] rounded-[10px] shadow-md ">
                          Share profile
                        </button>
                      </div>
                    ) : (
                      <div className=" flex justify-between w-[60%] max-[750px]:hidden">
                       {userDetails && userDetails.followers.includes(userId) ? (
                      <button onClick={unfollow} className="bg-gray-400 font-QSemi text-white px-[15%]  max-[900px]:px-[12%] py-[4%] rounded-[10px] shadow-md ">
                        Unfollow
                      </button>
                    ) : (
                      <button  onClick={follow} className="bg-[#8735C8] font-QSemi text-white px-[15%]  max-[900px]:px-[12%] py-[4%] rounded-[10px] shadow-md ">
                        Follow
                      </button>
                    )}
                        <button onClick={()=>nav(`/message/${profiledata.user}`)} className="bg-gray-400 font-QSemi text-white px-[15%]  max-[900px]:px-[12%] py-[4%] rounded-[10px] shadow-md ">
                          Message
                        </button>
                      </div>
                    )}

                    <div className="dropdown">
                      <FontAwesomeIcon icon={faEllipsis} />

                      <ul className="dropdown-menu text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[1000px]:left-[-80px] max-[550px]:text-[11px] max-[500px]:left-[-110px] max-[1000px]:w-[150px] ">
                        <li
                          className="font-QSemi"
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
                      <h1 className="mr-[12%]">{post.length}</h1>
                      <p className="max-[500px]:text-[12px]">Posts</p>
                    </div>

                    <div className="flex max-[650px]:grid">
                      <h1 className="mr-[12%]">
                        {userDetails && userDetails.followers.length}
                      </h1>
                      <p className="max-[500px]:text-[12px]">Followers</p>
                    </div>
                    <div className="flex max-[650px]:grid">
                      <h1 className="mr-[12%]">
                        {userDetails && userDetails.following.length}
                      </h1>
                      <p className="max-[500px]:text-[12px]">Following</p>
                    </div>
                  </div>
                  <div className="max-[750px]:hidden">
                    <div className="font-QSemi text-start">
                      <h2>{profiledata ? profiledata.bio : null}</h2>
                    </div>
                    {followers.length>0 &&<div className="flex font-QMedium  my-[3%]">
                      
                      <p className="text-gray-500 mr-[1%]">Followed by </p>
                      {followers.length>0 && followers.map((follower,index)=>{
                        if(index<2)
                        return(
                          <p className="font-QSemi">{follower.name} ,</p>
                        )
                      })}
                     
                    {followers.length>2&&
                     <p className="text-gray-500 ml-[1%]">and {followers.length-2} more</p>}
                     
                    </div>}
                    
                  </div>
                </div>
              </div>
              <div className=" hidden max-[540px]:text-[12px] max-[750px]:block">
              <div className="font-QSemi text-start">
                      <h2>{profiledata ? profiledata.bio : null}</h2>
                    </div>
                    {followers.length>0 &&<div className="flex font-QMedium  my-[3%]">
                      
                      <p className="text-gray-500 mr-[1%]">Followed by </p>
                      {followers.length>0 && followers.map((follower,index)=>{
                        if(index<2)
                        return(
                          <p className="font-QSemi">{follower.name} ,</p>
                        )
                      })}
                     
                    {followers.length>2&&
                     <p className="text-gray-500 ml-[1%]">and {followers.length-2} more</p>}
                     
                    </div>}
                {pickBookUserName === userName ? (
                  <div className="flex">
                    <button
                      onClick={() => nav("/edit-profile")}
                      className="bg-[#8735C8] font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] mr-[7%]"
                    >
                      Edit Profile
                    </button>
                    <button className="bg-gray-400 font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] ">
                      Share Profile
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    {userDetails && userDetails.followers.includes(userId) ? (
                      <button onClick={unfollow} className="bg-[#8735C8] font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] mr-[7%]">
                        Unfollow
                      </button>
                    ) : (
                      <button onClick={follow} className="bg-[#8735C8] font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] mr-[7%]">
                        Follow
                      </button>
                    )}

                    <button onClick={()=>nav(`/message/${profiledata.user}`)} className="bg-gray-400 font-QSemi text-white px-[5%] py-[1%] max-[425px]px-[7%] max-[425px]:py-[2%] max-[425px]:rounded-[5px] rounded-[10px] ">
                      Message
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="my-[5%]">
              <div className="flex justify-center items-center pb-[4%] pt-[2%] border-t-[2px] text-gray-500  ">
                <FontAwesomeIcon className="mr-[1%]" icon={faTableCells} />
                <h2 className="font-QSemi ml-[1%] ">POSTS</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-[10%] ">
                {post &&
                  post.map((post) => {
                    const filter = allComment.filter(
                      (name) => name.post === post._id
                    );
                    return (
                      <div
                        onClick={() => nav(`/post/${post._id}`)}
                        className="relative group cursor-pointer"
                      >
                        <img
                          className="w-full h-full max-[425px]:rounded-[7px] aspect-square object-cover rounded-[20px] shadow-md transition duration-300 group-hover:brightness-50"
                          src={post.image}
                          alt=""
                        />
                        <div className="hidden group-hover:flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 text-white font-QSemi text-[20px]">
                          <FontAwesomeIcon icon={faHeart} />
                          <h3 className="mr-[2%]">{post.like.length}</h3>
                          <FontAwesomeIcon
                            className="ml-[2%]"
                            icon={faMessage}
                          />
                          <h3>{filter.length}</h3>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}

      <Footer />
    </div>
  );
};

export default UserProfile;
