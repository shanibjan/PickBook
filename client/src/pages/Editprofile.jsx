import React, { useEffect, useState } from "react";
import logo from "../images/—Pngtree—the letter p on a_15885322.png";
import axios from "axios";

const Editprofile = () => {
  const user = JSON.parse(localStorage.getItem("pickbook-user"));

  const userId = user ? user._id : null;
  const userName = user ? user.name : null;
  

  const [image, setImage] = useState();
  const [profiledata, setProfileData] = useState([]);
  const[bio,setBio]=useState()
  

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
      const res = await axios.get(`api/v1/user/get-profile/${userId}`);
      if (res) {
        setProfileData(res.data);
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
      const res = await axios.put(`api/v1/user/edit-profile/${profiledata[0]._id}`,{image:image||profiledata[0].image,bio:bio||profiledata[0].bio});
      console.log(res.data);
      window.alert(res.data.message)
      
    } catch (error) {
       window.alert(error.response.data.message);
    }
  };

  const addProfile = async () => {
    try {
      const res = await axios.post(`api/v1/user/add-profile`,{image,bio,userId,userName});
      console.log(res.data);
      window.alert(res.data.message)
      
    } catch (error) {
       window.alert(error.response.data.message);
    }
  };




  return (
    <div>
      <div className="h-screen">
        <div className="flex  items-center justify-center">
          <div className="h-[80px] w-[80px] max-[425px]:w-[70px] max-[425px]:h-[70px] ">
            <img className="h-full w-full aspect-square" src={logo} alt="" />
          </div>
          <div>
            <h1 className="font-QBold text-[35px] ">PickBook</h1>
          </div>
        </div>
        <div className="h-[75%] flex items-center justify-center">
          <div className="  mb-[4%] pt-[6%] w-[500px] max-[600px]:pt-[10%] ">
            <h1 className="text-[40px] mb-[17%] max-[550px]:text-[30px] max-[370px]:text-[25px] font-QBold text-[#244262]">
              Edit Profile
            </h1>
            <input
              type="file"
              id="myFile"
              name="filename"
              multiple
              accept=".jpg,.jpeg,.png"
              className="p-[4%] bg-[#EBF5FF] w-full mb-[2%] font-gorditaRegular"
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
            {profiledata.length>0?( <button
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
    </div>
  );
};

export default Editprofile;
