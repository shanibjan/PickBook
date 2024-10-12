import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts';
import Comments from '../components/Comments';

const Home = () => {
 
  return (
    <div>
     <NavBar/>

     <Posts/>
    </div>
  );
};

export default Home;