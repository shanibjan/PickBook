import React, { useState } from "react";
import logo from "../images/—Pngtree—the letter p on a_15885322.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({}) => {
  const [phone, setPhone] = useState("+91");
  const [valid, setValid] = useState(true);
  const [password, setPassword] = useState();
  console.log(phone);

  const nav = useNavigate();

  const handleInputChange = (e) => {
    // Ensure the value always starts with +91
    if (e.target.value.startsWith("+91")) {
      setPhone(e.target.value);
    }
    setValid(true);

    if (phone && phone.length === 12) {
      setValid(false);
    }
    if (phone && phone.length === 14) {
      setValid(false);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        password,
        phone,
      });
      if (res.data.success) {
        localStorage.setItem("pickbook-token", res.data.token);
        localStorage.setItem("pickbook-user", JSON.stringify(res.data.user));
        window.alert(res.data.message);
        nav("/");
      } else {
        window.alert(res.data.message);
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
  return (
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
        <div className="  mb-[4%] pt-[6%] max-[600px]:pt-[10%] ">
          <h1 className="text-[40px] mb-[17%] max-[550px]:text-[30px] max-[370px]:text-[25px] font-QBold text-[#244262]">
            User Login
          </h1>
          <h4 className="text-[30px] max-[550px]:text-[20px] max-[370px]:text-[15px] font-QSemi text-[#244262] my-[4%] ">
            Provide User information here
          </h4>
          <div>
            <input
              className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[60%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] "
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handleInputChange}
            />
            <br />
            <AnimatePresence>
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
          </div>
          <br />
          <input
            className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[60%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] mt-[7%] "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <p className="font-QMedium cursor-pointer max-[560px]:text-[12px] text-[#8735C8]" >Forgot password?</p>

          <button
            onClick={login}
            className="bg-[#8735C8] py-[1%] px-[5%] font-QMedium text-[12px] tracking-[2px] my-[7%]  text-white"
          >
            LOGIN
          </button>
          <h4 onClick={()=>nav('/signup')} className="text-[20px] max-[450px]:text-[15px] font-QMedium text-[#244262] cursor-pointer my-[3%]">
            Go to Register page
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
