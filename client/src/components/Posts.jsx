import React, { useEffect, useState } from "react";
import user1 from "../images/user.png";
// max-[800px]:mb-[400px] max-[600px]:mb-[300px] max-[425px]:mb-[230px]
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faHeart,
  faCommentDots,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Comments from "./Comments";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import toastStyles from "../toastStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loading from "../images/buffering-colors.gif";
const Posts = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [description, setDescription] = useState();
  const [post, setPost] = useState([]);
  const [image, setImage] = useState();
  const [profiledata, setProfileData] = useState();
  const [postIdForComment, setPostIdForComment] = useState();
  const [allComment, setAllComment] = useState([]);

  //  const filteredPosts=post.filter((p)=>{
  //   return(userDetails && (userDetails.following.includes(p.user._id) || userDetails._id===p.user._id) )
  //  })
  console.log(post);

  const user = JSON.parse(localStorage.getItem("pickbook-user"));

  const userId = user ? user._id : null;
  const userName = user ? user.name : null;

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-profile-for-users/${userName}`
      );
      if (res.data) {
        setUserDetails(res.data.userDetails);
      } else {
        setUserDetails();
      }
    } catch (error) {}
  };

  const fetchPost = async () => {
    try {
      console.log(userDetails._id);
      
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-filter-post/${userDetails._id}`
      );
      console.log(res.data);

      if (res.data) {
        setPost(res.data);
        setIsLoading(false);
      } else {
        setPost([]);
      }
    } catch (error) {}
  };

  post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const store = async (e) => {
    let val = e.target.files[0];

    const options = {
      maxSizeMB: 1, // Maximum file size (in MB)
      maxWidthOrHeight: 800, // Max width or height in pixels
      useWebWorker: true, // Use web workers for performance
    };

    try {
      // Compress the image
      const compressedFile = await imageCompression(val, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile); // Convert the compressed image to base64

      reader.addEventListener("load", () => {
        let imageLoader = reader.result;

        // Set the compressed image as base64
        setImage(imageLoader);
      });
    } catch (error) {
      console.log("Error during image compression:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-profile-for-users/${userName}`
      );
      if (res) {
        setProfileData(res.data.profile);
      } else {
        setProfileData();
      }
    } catch (error) {}
  };

  const fetchComment = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-all-comments`
      );
      if (res) {
        setAllComment(res.data);
      } else {
        setAllComment([]);
      }
    } catch (error) {}
  };

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };

  useEffect(() => {
    handleDataFromChild();

    fetchProfile();
  }, []);

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);

  const addPost = async () => {
    try {
      const res = await axios.post(
        "https://pickbook-da7f.onrender.com/api/v1/user/add-post",
        {
          profileData: profiledata._id,
          userId,
          description,
          image,
          userName,
        }
      );

      toast.success(res.data.message, {
        ...toastStyles,
      });
      fetchPost();
    } catch (error) {
      toast.success(error.response.data.message, {
        ...toastStyles,
      });
    }
  };

  const likePost = async (post) => {
    try {
      await axios.post("https://pickbook-da7f.onrender.com/api/v1/user/like-post", {
        postId: post._id,
        userId,
      });

      fetchPost();
      if (post.user._id !== userId) {
        const res = await axios.post(
          "https://pickbook-da7f.onrender.com/api/v1/user/noti-like",
          {
            postUser: post.user._id,
            likedUser: userName,
            likedUserProfileId: profiledata._id,
            post: post.image,
          }
        );
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dislikePost = async (post) => {
    try {
      await axios.post("https://pickbook-da7f.onrender.com/api/v1/user/dislike-post", {
        postId: post._id,
        userId,
      });

      fetchPost();

      const res = await axios.post(
        "https://pickbook-da7f.onrender.com/api/v1/user/noti-dislike",
        { postUser: post.user._id, post: post.image, likedUser: userName }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (postId) => {
    try {
      console.log(postId);

      const res = await axios.delete(
        `https://pickbook-da7f.onrender.com/api/v1/user/remove-post/${postId}`
      );
      fetchPost();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
    fetchComment();
    fetchUserDetails();
  }, []);
  useEffect(() => {
    
      fetchPost();
    
  }, [userDetails]);
  useEffect(() => {
    fetchComment();
  }, [isCommentVisible]);
  return (
   

    <div className="relative">
      <div className=" w-[90%] overflow-y-scroll  m-[5%] absolute top-[20px] max-[600px]:top-[35px] bg-[#FAFAFA] p-[3%] rounded-[10px]">
        <div className="px-[10%] max-[900px]:px-[5%] py-[2%] mt-[2%] max-[930px]:mt-[6%] bg-white rounded-[10px] shadow-lg">
          <div className="flex justify-between pb-[3%] border-b-[1px] ">
            <div className="h-[60px] max-[600px]:h-[40px] max-[425px]:h-[35px]">
              {profiledata ? (
                <img
                  className="h-full object-cover aspect-square rounded-[50%]"
                  src={profiledata.image}
                  alt=""
                />
              ) : (
                <img className="h-full" src={user1} alt="" />
              )}
            </div>
            <input
              className="w-[93%] max-[425px]:text-[12px] px-[3%] bg-gray-100 font-QRegular outline-none rounded-[20px]"
              type="text"
              placeholder="What do you want to share today..!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-[3%]">
            <div className="file-input flex justify-between items-center">
              <input
                type="file"
                id="file"
                class="file"
                accept=".jpg,.jpeg,.png"
                onChange={store}
              />
              <FontAwesomeIcon className="text-orange-400" icon={faImage} />
              <label
                className="cursor-pointer font-QSemi max-[425px]:text-[12px] ml-[15%] "
                for="file"
              >
                Photo/Video
              </label>
            </div>

            <button
              onClick={addPost}
              className="bg-[#8735C8] max-[425px]:text-[12px] font-QSemi text-white px-[5%] py-[1%] rounded-[20px] "
            >
              Post
            </button>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="h-[400px] max-[450px]:h-[300px]">
              <img
                src={loading}
                alt=""
                className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]"
              />
            </div>
          ) : null}
          {post.length > 0 ? (
            <div className="mt-[6%] max-[425px]:mt-[13%]  overflow-y-auto grid grid-cols-2 gap-[1%] max-[800px]:grid-cols-1">
              {post.map((item, index) => {
               

                const filter = allComment.filter(
                  (name) => name.post === item._id
                );

                return (
                  <div
                    className={`bg-white shadow-lg   p-[3%] rounded-[10px] ${
                      index === post.length - 1
                        ? "max-[800px]:mb-[50px]"
                        : "mb-0"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center w-[70%]">
                        {item.profile ? (
                          <img
                            className="h-[60px] aspect-square  max-[600px]:h-[40px] max-[425px]:h-[35px] object-cover rounded-[50%]"
                            src={item.profile.image}
                            alt=""
                          />
                        ) : (
                          <img
                            className="h-[60px] aspect-square  max-[600px]:h-[40px] max-[425px]:h-[35px] object-cover rounded-[50%]"
                            src={user1}
                            alt=""
                          />
                        )}

                        <div className="text-start ml-[5%]">
                          <h1
                            onClick={() => nav(`/user/${item.userName}`)}
                            className="font-QSemi cursor-pointer max-[425px]:text-[15px] "
                          >
                            {item.userName}
                          </h1>
                          <p className="font-QRegular text-gray-500 max-[425px]:text-[12px]">
                            {item.createdAt}
                          </p>
                        </div>
                      </div>
                      <div className="dropdown">
                        <FontAwesomeIcon icon={faEllipsis} />
                        {item.user._id === userId ? (
                          <ul className="dropdown-menu font-QSemi text-[#244262] leading-[35px] max-[1000px]:px-[20px] left-[-170px] max-[1000px]:left-[-125px] max-[550px]:text-[11px] max-[500px]:left-[-125px] max-[1000px]:w-[150px] ">
                            <li
                              onClick={() => removePost(item._id)}
                              className="border-b-[1px]"
                            >
                              Remove post
                            </li>
                            <li onClick={() => nav(`/user/${item.userName}`)}>
                              Go to profile
                            </li>
                          </ul>
                        ) : (
                          <ul className="dropdown-menu font-QSemi text-[#244262] leading-[35px] max-[1000px]:px-[20px] left-[-170px] max-[1000px]:left-[-125px] max-[550px]:text-[11px] max-[500px]:left-[-125px] max-[1000px]:w-[150px] ">
                            <li onClick={() => nav(`/user/${item.userName}`)}>
                              Go to profile
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="my-[4%]">
                        <p className=" text-left font-QMedium max-[425px]:text-[12px]">
                          {item.description}
                        </p>
                      </div>

                      <img
                        className="rounded-[20px] max-[425px]:rounded-[8px] w-full h-full aspect-square object-cover "
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="mx-[1%] mt-[4%]">
                      <div className="flex justify-between font-QSemi pb-[2%] border-b-[1px] max-[425px]:text-[13px] ">
                        <div className="flex justify-between w-[45%] max-[1200px]:w-[50%] max-[1000px]:w-[60%] max-[850px]:w-[35%] max-[740px]:w-[45%] max-[560px]:w-[55%] max-[475px]:w-[63%]">
                          <p>{item.like.length} Likes</p>
                          <p>•</p>
                          <p>{filter.length} Comments</p>
                        </div>
                        <div>
                          <p>{item.share} Shares</p>
                        </div>
                      </div>

                      <div className="flex justify-between mt-[2%] text-[25px] max-[1000px]:text-[20px] max-[425px]:text-[15px]">
                        <div className="flex w-[25%] justify-between cursor-pointer max-[1000px]:w-[35%]">
                          {item.like.includes(userId) ? (
                            <FontAwesomeIcon
                              onClick={() => dislikePost(item)}
                              className="text-red-600"
                              icon={faHeartSolid}
                            />
                          ) : (
                            <FontAwesomeIcon
                              onClick={() => likePost(item)}
                              icon={faHeart}
                            />
                          )}

                          <FontAwesomeIcon
                            onClick={() => (
                              setIsCommentVisible(true),
                              setPostIdForComment(item._id)
                            )}
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
          ) : isLoading === false ? (
            <div className="font-QSemi my-[4%] h-[300px] flex justify-center items-center">
              <h1>Follow Users For Exploring Posts</h1>
            </div>
          ) : null}
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
                <Comments
                  onDataSend={handleDataFromChild}
                  postId={postIdForComment}
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
      <ToastContainer limit={1} />
    </div>
  );
};

export default Posts;
