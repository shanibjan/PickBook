import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import user1 from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCommentDots,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faTableCells,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Comments from "../components/Comments";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import loading from "../images/buffering-colors.gif";

const PostDetails = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [postIdForComment, setPostIdForComment] = useState();
  const [post, setPost] = useState();
  const [posts, setPosts] = useState([]);
  const [comm, setComm] = useState([]);
  const [profiledata, setProfileData] = useState();
 
  
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  let { postId } = useParams();
  
  
  
  
  

  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
  const userId = user ? user._id : null;
  const userName = user ? user.name : null;

  const fetchComment = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-comment/${postId}`
      );
      if (res) {
        setComm(res.data);
       
      } else {
        setComm();
      }
    } catch (error) {}
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-post-over-view/${postId}`
      );
     
      if (res.data) {
       console.log(res.data);
       
        
        setPost(res.data);
        setIsLoading(false);
      } else {
        setPost();
       
      }
    } catch (error) {
        console.log(error);
       
        
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

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `https://pickbook-da7f.onrender.com/api/v1/user/get-posts-for-users/${
          post && post.userName
        }`
      );

      if (res) {
        setPosts(res.data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Run this effect whenever the route path changes

  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };
  useEffect(() => {
    fetchPosts();
  }, [post]);

  useEffect(() => {
    handleDataFromChild();
   
    fetchComment();
    fetchProfile();
  }, []);
  useEffect(() => {
    fetchPost();
    fetchComment();
  }, [postId]);

  useEffect(() => {
    fetchPost();
    fetchComment();
  }, [isCommentVisible]);

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);

  const likePost = async (postId) => {
    try {
      await axios.post("https://pickbook-da7f.onrender.com/api/v1/user/like-post", {
        postId,
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
  const dislikePost = async (postId) => {
    try {
      await axios.post("https://pickbook-da7f.onrender.com/api/v1/user/dislike-post", {
        postId,
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

  const removePost= async()=>{
    try {
     const res = await axios.delete(
       `http://localhost:7000/api/v1/user/remove-post/${post._id}`
     );
     console.log(res.data);
     nav(`/user/${userName}`)
 
     await axios.post(`http://localhost:7000/api/v1/user/noti-post-delete`,{postUser:userId,post:post.image})
     
    } catch (error) {
     
    }
     
   }
  return (
    <div className="absolute top-[70px] w-full">
      {user ? (
        <div>
          <NavBar />

          <div className="flex px-[5%]">
            <div className="w-[30%] h-screen max-[500px]:hidden overflow-y-scroll mr-[6%]">
              <div className="flex justify-center items-center pb-[20%] pt-[2%] border-t-[2px] text-gray-500  ">
                <FontAwesomeIcon className="mr-[1%]" icon={faTableCells} />
                <h2 className="font-QSemi ml-[1%] ">POSTS</h2>
              </div>
              <div className="grid gap-7">
                {posts &&
                  posts.map((post) => {
                    return (
                      <div onClick={() => {nav(`/post/${post._id}`)
                        setPost()
                        setIsLoading(true)
                      }}>
                        <img
                          className="  w-full object-cover aspect-square rounded-[20px] "
                          src={post.image}
                          alt=""
                        />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-lg w-full  max-h-screen max-[650px]:px-[4%] max-[500px]:px-[2%] overflow-y-scroll max-[800px]:mb-[10%]  py-[3%] px-[10%] rounded-[20px]">
              {isLoading ? (
                <div className="h-[400px] max-[450px]:h-[300px]">
                  <img
                    src={loading}
                    alt=""
                    className="mx-auto max-[550px]:h-[50px] max-[400px]:h-[25px]"
                  />
                </div>
              ) : null}
              {post ?(<div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center w-[70%]">
                    {post && post.profile ? (
                      <img
                        className="h-[60px] aspect-square  max-[600px]:h-[40px] max-[425px]:h-[35px] object-cover rounded-[50%]"
                        src={post.profile.image}
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
                        onClick={() => nav(`/user/${post.userName}`)}
                        className="font-QSemi cursor-pointer"
                      >
                        {post && post.userName}
                      </h1>
                      <p className="font-QRegular max-[425px]:text-[13px] text-gray-500">
                        {post && post.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="dropdown">
                    <FontAwesomeIcon icon={faEllipsis} />
                    {post && post.user._id === userId ? (
                      <ul className="dropdown-menu font-QSemi text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[1000px]:left-[-80px] max-[550px]:text-[11px] max-[500px]:left-[-110px] max-[1000px]:w-[150px] ">
                        <li onClick={removePost} className="border-b-[1px]">Remove post</li>
                        <li>Go to profile</li>
                      </ul>
                    ) : (
                      <ul className="dropdown-menu font-QSemi text-[#244262] leading-[35px] max-[1000px]:px-[20px] max-[1000px]:left-[-80px] max-[550px]:text-[11px] max-[500px]:left-[-110px] max-[1000px]:w-[150px] ">
                        <li onClick={() => nav(`/user/${post.userName}`)}>
                          Go to profile
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  <div className="my-[4%] max-[425px]:text-[13px]">
                    <p className=" text-left font-QMedium">
                      {post && post.description}
                    </p>
                  </div>

                  <img
                    className="rounded-[20px] max-[425px]:rounded-[8px] w-full h-full aspect-square object-cover "
                    src={post && post.image}
                    alt=""
                  />
                </div>
                <div className="mx-[1%] mt-[4%]">
                  <div className="flex justify-between font-QSemi pb-[2%] border-b-[1px] max-[425px]:text-[13px] ">
                    <div className="flex justify-between w-[45%]  max-[850px]:w-[65%]   max-[475px]:w-[63%]">
                      <p>{post && post.like.length} Likes</p>
                      <p>•</p>
                      <p>{comm && comm.length} Comments</p>
                    </div>
                    <div>
                      <p>15 Shares</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-[2%] text-[25px] max-[850px]:text-[20px]">
                    <div className="flex w-[25%] max-[850px]:w-[35%] justify-between cursor-pointer">
                      {post && post.like.includes(userId) ? (
                        <FontAwesomeIcon
                          onClick={() => dislikePost(post._id)}
                          className="text-red-600"
                          icon={faHeartSolid}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() => likePost(post._id)}
                          icon={faHeart}
                        />
                      )}
                      <FontAwesomeIcon
                        onClick={() => (
                          setIsCommentVisible(true),
                          setPostIdForComment(post._id)
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
              </div>):isLoading===false ?(<div className="font-QSemi my-[4%] h-[300px] flex justify-center items-center" >
                <h1>No Post Found</h1>
              </div>):null}
              
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}

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
    </div>
  );
};

export default PostDetails;
