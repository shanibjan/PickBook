import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Posts from "../components/Posts";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav=useNavigate()
  const [isCommentVisible, setIsCommentVisible] = useState(false);
 
  

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };
  
    const user = JSON.parse(localStorage.getItem("pickbook-user"));
  useEffect(() => {
    handleDataFromChild();
   
  }, []);

  


  return (
    <div>
      {user ? (
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
