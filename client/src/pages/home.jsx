import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Posts from "../components/Posts";

import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const nav=useNavigate()
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
  const userId = user ? user._id : null;
  const password=user? user.password:null
  const [check,setCheck]=useState(true)
  console.log(check);

  const checkPassword=async()=>{
    try {
      const res=await axios.post('https://pickbook-da7f.onrender.com/api/v1/user/check-password-change',{userId,password})
      setCheck(res.data.success);
      
    } catch (error) {
     
      setCheck(error.response.data.success);
      
    }
 }

 

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };
  
    
  useEffect(() => {
    handleDataFromChild();
    checkPassword()
  }, []);

  


  return (
    <div>
      {user && check ? (
        <div>
          <NavBar datas={isCommentVisible} />

          <Posts />
          <Footer onDataSend={handleDataFromChild}  />
        </div>
      ) : nav('/login')}
    </div>
  );
};

export default Home;
