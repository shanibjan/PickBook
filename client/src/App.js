import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import UserProfile from "./pages/UserProfile";
import PostDetails from "./pages/PostDetails";
import Message from "./pages/Message";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editprofile from "./pages/Editprofile";

import Noti from "./pages/Noti";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <div className="App">
     <Routes>
     <Route  path="/login" element={<Login/>} />
     <Route  path="/signup" element={<Signup/>} />
      <Route exact path="/" element={<Home/>} />
      <Route  path="/user/:pickBookUserName" element={<UserProfile/>} />
      
      <Route  path="/post/:postId" element={<PostDetails/>} />
      <Route  path="/message/:receiverId" element={<Message/>} />
      <Route  path="/edit-profile" element={<Editprofile/>} />
      <Route  path="/change-password" element={<ChangePassword/>} />
      <Route  path="/noti" element={<Noti/>} />
     </Routes>
    
    </div>
  );
}

export default App;
