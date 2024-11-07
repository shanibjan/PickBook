import React, { useEffect, useRef, useState } from "react";
import logo from "../images/—Pngtree—the letter p on a_15885322.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMessage,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";
import userimg from "../images/user.png";
import Comments from "./Comments";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notifications";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const NavBar = () => {
  const nav =useNavigate()
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [profiledata, setProfileData] = useState();
  const [relatedKeywordsData,setrelatedKeywordsData]=useState([])
  const searchitems = useRef();

  const user = JSON.parse(localStorage.getItem("pickbook-user"));
 
 
  const userName = user ? user.name : null;
  const userId = user ? user._id : null;
  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };
const fetchUserNames=async()=>{
  try {
    const res= await axios.get('https://pickbook-da7f.onrender.com/api/v1/user/all-users')
   
    setrelatedKeywordsData(res.data)
    
  } catch (error) {
    
  }
}
  const fetchProfile = async () => {
    try {
      const res = await axios.get( `https://pickbook-da7f.onrender.com/api/v1/user/get-profile-for-users/${userName}`);
      if (res) {
        setProfileData(res.data.profile);
      } else {
        setProfileData();
      }
    } catch (error) {

    }
  };


  useEffect(() => {
    fetchProfile();
    fetchUserNames()
  }, []);
  

  useEffect(() => {
    if (isCommentVisible === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isCommentVisible]);


  function displayRelatedKeywords(keywords) {
    
    const relatedKeywordsContainer = document.getElementById("relatedKeywords");
   
    

    relatedKeywordsContainer.innerHTML = "";
    keywords.forEach((keyword) => {
      // const searchLens=document.querySelector('.search-lens')
      // console.log(searchLens);
      relatedKeywordsContainer.style.display="block"
      const keywordElement = document.createElement("div");
      keywordElement.style.margin = "30px";
      keywordElement.addEventListener("click", () => {
        const searchInput = document.getElementById("searchInput");
        searchInput.value = keyword;
        relatedKeywordsContainer.style.display = "none";
      });
      keywordElement.textContent = keyword;
      relatedKeywordsContainer.appendChild(keywordElement);
    });
  }
  function handleSearchInput(event) {
    const searchQuery = event.target.value.toLowerCase();
    const matchedKeywords = relatedKeywordsData.filter((keyword) =>
      keyword.toLowerCase().includes(searchQuery)
    );
    displayRelatedKeywords(matchedKeywords);
  }

  const searchInput = document.getElementById("searchInput");
  const relatedKeywordsContainer = document.getElementById("relatedKeywords");
  if (searchInput != null) {
    searchInput.addEventListener("input", handleSearchInput, () => {
      relatedKeywordsContainer.style.display = "block";
    });
  }
const clickSearch=()=>{
  nav(`/user/${searchitems.current.value}`)
  searchitems.current.value=""
}
  

  return (
    <div>
      <div className="flex justify-between text-gray-700 items-center px-[5%] fixed w-full z-[100] bg-white top-0">
        <div onClick={()=>nav('/')} className="flex cursor-pointer justify-start items-center w-[20%] max-[1310px]:w-[25%] max-[1050px]:w-[32%] max-[800px]:w-[45%] max-[600px]:w-[25%]">
          <div className="h-[80px] w-[80px] max-[425px]:w-[70px] max-[425px]:h-[70px] ">
            <img className="h-full w-full" src={logo} alt="" />
          </div>
          <div>
            <h1 className="font-QBold text-[35px] max-[600px]:hidden">
              PickBook
            </h1>
          </div>
        </div>
        <div className="placeSearch bg-gray-100 w-[50%] max-[800px]:w-[70%] rounded-[10px]">
        <input
        className="bg-gray-100 font-QLight"
          ref={searchitems}
          type="text"
          id="searchInput"
          placeholder="Search..."
        />
        <div id="relatedKeywords" className="bg-gray-100 text-gray-500 font-QSemi rounded-bl-[10px] rounded-br-[10px]"></div>
        <div onClick={clickSearch} className="search-lense">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
        <div className="flex justify-between items-center cursor-pointer w-[20%] max-[800px]:hidden">
          <div className="h-[25px] w-[25px]">
            <FontAwesomeIcon icon={faSquarePlus} className="w-full h-full" />
          </div>
          <div onClick={()=>nav(`/message/${userId}`)} className="h-[25px] w-[25px]">
            <FontAwesomeIcon icon={faMessage} className="w-full h-full" />
          </div>
          <div className="h-[25px] w-[25px]" onClick={() => setIsCommentVisible(true)}>
            <FontAwesomeIcon icon={faBell} className="w-full h-full" />
          </div>
          <div onClick={()=>nav(`/user/${userName}`)} className="h-[50px] w-[50px]">
            {profiledata?( <img className="h-full w-full  object-cover rounded-[50%]" src={profiledata.image} alt="" />):( <img className="h-full w-full" src={userimg} alt="" />)}
           
          </div>
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
                <Notification onDataSend={handleDataFromChild}  />
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
