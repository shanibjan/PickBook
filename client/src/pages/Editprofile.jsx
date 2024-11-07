import React, { useEffect, useState } from "react";

import axios from "axios";
import NavBar from '../components/NavBar';
import Footer from "../components/Footer";
import toastStyles from "../toastStyle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Editprofile = () => {
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
const nav=useNavigate()
  const userId = user ? user._id : null;
  const userName = user ? user.name : null;
  

  const [image, setImage] = useState();
  const [profiledata, setProfileData] = useState();
  const[bio,setBio]=useState()
  console.log(profiledata);
  
  

  const store = (e) => {
    let val = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(val);

    reader.addEventListener("load", () => {
      let imageLoader = reader.result;

      setImage(imageLoader);
    });
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://pickbook-da7f.onrender.com/api/v1/user/get-profile-for-users/${userName}`);
      if (res) {
        setProfileData(res.data.profile);
      } else {
        setProfileData([]);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const changeProfile = async () => {
   
    
    
    try {
      const res = await axios.put(`https://pickbook-da7f.onrender.com/api/v1/user/edit-profile/${profiledata._id}`,{image:image||profiledata.image,bio:bio||profiledata.bio});
      console.log(res.data);
      
      toast.success(res.data.message, {
        ...toastStyles,
        onClose: () => nav(`/user/${userName}`),
       
      });
      
    } catch (error) {
      console.log(error);
      
      
       toast.success(error.response.data.message, {
        ...toastStyles,
       
      });
    }
  };

  const addProfile = async () => {
    try {
      const res = await axios.post(`https://pickbook-da7f.onrender.com/api/v1/user/add-profile`,{image,bio,userId,userName});
      console.log(res.data);
     
      toast.success(res.data.message, {
        ...toastStyles,
        onClose: () => nav(`/user/${userName}`),
      });
      
    } catch (error) {
      
       toast.success(error.response.data.message, {
        ...toastStyles,
       
      });
    }
  };




  return (
    <div>
      <div className="h-screen">
        <NavBar/>
        
        <div className="h-[75%] flex items-center justify-center">
          <div className="  mb-[4%] pt-[6%] mt-[200px] w-[500px] max-[600px]:pt-[10%] ">
            <h1 className="text-[40px] mb-[17%] max-[550px]:text-[30px] max-[370px]:text-[25px] font-QBold text-[#244262]">
              Edit Profile
            </h1>
            <input
              type="file"
              id="myFile"
              name="filename"
              multiple
              accept=".jpg,.jpeg,.png"
              className="p-[4%] bg-[#EBF5FF] w-full max-[750px]:w-[65%] max-[500px]:w-[80%] mb-[2%] font-gorditaRegular"
              onChange={store}
            />

            <textarea
              className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-full max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] mt-[7%] "
              name=""
              id=""
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
              placeholder="Bio"
            ></textarea>

            <br />
            {profiledata?( <button
              onClick={changeProfile}
              className="bg-[#8735C8] py-[3%] px-[7%] font-QMedium text-[12px] tracking-[2px] my-[7%]  text-white"
            >
              CHANGE PROFILE
            </button>):(
               <button
               onClick={addProfile}
               className="bg-[#8735C8] py-[3%] px-[7%] font-QMedium text-[12px] tracking-[2px] my-[7%]  text-white"
             >
              ADD PROFILE
             </button>
            )}

           
          </div>
        </div>
      </div>
      <Footer/>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Editprofile;
