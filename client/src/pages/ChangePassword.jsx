import React, { useState } from "react";
import logo from "../images/—Pngtree—the letter p on a_15885322.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastStyles from "../toastStyle";

const ChangePassword = ({}) => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const user = JSON.parse(localStorage.getItem("pickbook-user"));
  const userId = user ? user._id : null;
  const [seeOld, setSeeOld] = useState(false);
  const [seeNew, setSeeNew] = useState(false);
  const nav=useNavigate()
  const userName = user ? user.name : null;
  // const password = user ? user.password : null;

  const changePassword = async () => {
    try {
      const res = await axios.post(
        "https://pickbook-da7f.onrender.com/api/v1/auth/change-password-login",
        { password: oldPassword, userId, newPassword }
      );
      localStorage.setItem("pickbook-user", JSON.stringify(res.data.user));
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
      <div onClick={()=>nav('/')} className="flex  items-center justify-center">
        <div className="h-[80px] w-[80px] max-[425px]:w-[70px] max-[425px]:h-[70px] ">
          <img  className="h-full w-full aspect-square" src={logo} alt="" />
        </div>
        <div>
          <h1 className="font-QBold text-[35px] ">PickBook</h1>
        </div>
      </div>
      <div className="h-[75%] flex items-center justify-center">
        <div className="  mb-[4%] pt-[6%] max-[600px]:pt-[10%] ">
          <h1 className="text-[40px] mb-[17%] max-[550px]:text-[30px] max-[370px]:text-[25px] font-QBold text-[#244262]">
            Change Password
          </h1>
          <div>
            <div className="bg-slate-100 flex justify-between items-center">
              <input
                className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[80%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] "
                type={`${seeOld ? "text" : "password"}`}
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {seeOld ? (
                <FontAwesomeIcon
                  onClick={() => setSeeOld(!seeOld)}
                  className="p-[1%] text-gray-500 cursor-pointer"
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setSeeOld(!seeOld)}
                  className="p-[1%] text-gray-500 cursor-pointer"
                  icon={faEye}
                />
              )}
            </div>

            <br />
            {/* <AnimatePresence>
                {valid && (
                  <motion.div
                    key="error-message" // Add a unique key for AnimatePresence
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-500 absolute left-0 right-0 font-QRegular max-[560px]:text-[12px]"
                  >
                    Enter a valid phone number
                  </motion.div>
                )}
              </AnimatePresence>
              <br /> */}
            <div className="bg-slate-100 flex justify-between items-center">
              <input
                className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[80%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] "
                type={`${seeNew ? "text" : "password"}`}
                placeholder="Enter your old password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {seeNew ? (
                <FontAwesomeIcon
                  onClick={() => setSeeNew(!seeNew)}
                  className="p-[1%] text-gray-500 cursor-pointer"
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setSeeNew(!seeNew)}
                  className="p-[1%] text-gray-500 cursor-pointer"
                  icon={faEye}
                />
              )}
            </div>
           
          </div>
          <button
            onClick={changePassword}
            className="bg-[#8735C8] py-[3%] px-[7%] font-QMedium text-[12px] tracking-[2px] my-[7%]  text-white"
          >
            CHANGE PASSWORD
          </button>
        </div>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};

export default ChangePassword;
