import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import UserProfile from "./pages/UserProfile";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import Message from "./pages/Message";

function App() {
  return (
    <div className="App">
     <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route  path="/user" element={<UserProfile/>} />
      <Route  path="/profile" element={<Profile/>} />
      <Route  path="/post" element={<PostDetails/>} />
      <Route  path="/message" element={<Message/>} />
     </Routes>
    </div>
  );
}

export default App;
