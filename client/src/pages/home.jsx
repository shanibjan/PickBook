import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts';
import Comments from '../components/Comments';
import Footer from '../components/Footer';

const Home = () => {
  const [isCommentVisible, setIsCommentVisible] = useState(false);
 
  

  const handleDataFromChild = (data) => {
    setIsCommentVisible(data);
  };

  useEffect(() => {
    handleDataFromChild();
  }, []);
 
  return (
    <div>
     <NavBar datas={isCommentVisible} />

     <Posts/>
     <Footer onDataSend={handleDataFromChild}/>
    </div>
  );
};

export default Home;