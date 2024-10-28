import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import user2 from "../images/user.png";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

const Comments = ({ onDataSend, postId }) => {
  const user = JSON.parse(localStorage.getItem("pickbook-user"));

  const userName = user ? user.name : null;

  const [hide, setHide] = useState(true);
  const [profiledata, setProfileData] = useState();
  const [comm, setComm] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  console.log(showPicker);
  
 
  const onEmojiClick = (emojiData) => {
    setCommentFromUser((prevInput) => prevInput + emojiData.emoji); 
    setShowPicker(false)// Correct emoji property
    // Hide emoji picker after selection
  };

  const [commentFromUser, setCommentFromUser] = useState("");

  comm && comm.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    onDataSend(hide);
  }, [hide]);

  const fetchComment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-comment/${postId}`
      );
      if (res) {
        setComm(res.data);
      } else {
        setComm();
      }
    } catch (error) {}
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/user/get-profile-for-users/${userName}`
      );
      if (res) {
        setProfileData(res.data);
      } else {
        setProfileData();
      }
    } catch (error) {}
  };

  const addComment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/api/v1/user/add-comment",
        {
          postId,
          profile: profiledata._id,
          comment: commentFromUser,
          userName,
        }
      );
      setCommentFromUser("")
      fetchComment();
    } catch (error) {
      console.log(error);

      // window.alert(error.response.data.message);
    }
  };

  const removeComment = async (commentId) => {
    try {
      await axios.delete(`api/v1/user/remove-comment/${commentId}`);
      fetchComment();
    } catch (error) {}
  };

  useEffect(() => {
    fetchProfile();

    fetchComment();
  }, []);

  return (
    <div  className="dd fixed bottom-0 left-0 right-0 z-10 h-screen bg-[#FAFAFA] mx-[5%] max-[425px]:mx-[2%] overflow-y-scroll rounded-t-[20px] max-[550px]:rounded-t-[10px] shadow-lg">
      <div className="flex justify-between fixed w-[84%] text-[25px] mx-[3%] mb-[3%] z-[1] bg-[#FAFAFA] p-[3%] max-[550px]:text-[20px] ">
        <h1 className="w-full font-QSemi">Comments</h1>
        <FontAwesomeIcon
          onClick={() => setHide(false)}
          className="absolute right-0 cursor-pointer"
          icon={faXmark}
        />
      </div>
      <div  className="absolute top-[85px] w-full">
        {comm &&
          comm.map((comment, index) => {
          

            return (
              <div
                className={`flex bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%] ${
                  index === comm.length - 1 ? "mb-[100px]" : "mb-0"
                }`}
              >
                {comment.profile ? (
                  <img
                    className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%] mr-[3%]"
                    src={comment.profile.image}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%] mr-[3%]"
                    src={user2}
                    alt=""
                  />
                )}
                <div className="flex justify-between w-[93%]">
                  <div className="text-left ">
                    <h2 className="font-QBold  max-[540px]:text-[16px] max-[425px]:text-[14px]">
                      {comment.userName}
                    </h2>
                    <p className="font-QRegular  max-[540px]:text-[13px] max-[425px]:text-[13px]">
                      {comment.comment}
                    </p>
                  </div>
                  {comment.userName === userName ? (
                    <FontAwesomeIcon
                      onClick={() => removeComment(comment._id)}
                      icon={faXmark}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex fixed bottom-0 w-[84%] max-[425px]:w-[90%] bg-white rounded-[20px] justify-between items-center mx-[3%] p-[2%]  ">
        <div className="h-[60px] flex items-center">
          {profiledata ? (
            <img
              className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%]"
              src={profiledata.image}
              alt=""
            />
          ) : (
            <img
              className="h-[50px] max-[425px]:h-[40px] aspect-square object-cover rounded-[50%]"
              src={user2}
              alt=""
            />
          )}
        </div>
        {showPicker && (
          <div className="absolute bottom-[64px] w-[95%]">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button className="max-[425px]:hidden text-[25px]" onClick={() => setShowPicker(!showPicker)}>
          <FontAwesomeIcon icon={faFaceSmile} />
        </button>
        <input
          className="w-[85%]  max-[500px]:w-[77%] h-[50px] max-[425px]:h-[35px] max-[425px]:text-[12px] max-[425px]:rounded-[10px] px-[3%] bg-gray-100 font-QRegular outline-none rounded-[20px]"
          type="text"
          placeholder="comment here"
          value={commentFromUser}
          onChange={(e) => setCommentFromUser(e.target.value)}
        />
        <FontAwesomeIcon
          onClick={addComment}
          className="h-[25px] max-[425px]:h-[18px] text-gray-500 cursor-pointer"
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
};

export default Comments;
