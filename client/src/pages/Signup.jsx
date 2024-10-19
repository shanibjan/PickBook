import React, { useState } from 'react';
import logo from "../images/—Pngtree—the letter p on a_15885322.png";


const Signup = ({ }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
      <div className="h-screen">
         <div className="flex  items-center justify-center">
            <div className="h-[80px] w-[80px] max-[425px]:w-[70px] max-[425px]:h-[70px] ">
              <img className="h-full w-full aspect-square" src={logo} alt="" />
            </div>
            <div>
              <h1 className="font-QBold text-[35px] ">
                PickBook
              </h1>
            </div>
          </div>
        <div className="h-[75%] flex items-center justify-center" >
          <div className="  mb-[4%] pt-[6%] max-[600px]:pt-[10%] ">
            <h1 className="text-[40px] mb-[17%] max-[550px]:text-[30px] max-[370px]:text-[25px] font-QBold text-[#244262]">
              User Signup
            </h1>
            <h4 className="text-[30px] max-[550px]:text-[20px] max-[370px]:text-[15px] font-QSemi text-[#244262] my-[4%] ">
              Provide User information here
            </h4>
            <input
              className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[60%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] max-[425px]:mb-[7%]"
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[60%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] max-[425px]:mb-[7%]"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              className="bg-[#EBF5FF] outline-none max-[425px]:text-[12px] max-[425px]:py-[3%] font-QRegular w-[60%] max-[750px]:w-[65%] max-[500px]:w-[80%] py-[1%] px-[2%] mb-[2%] max-[425px]:mb-[7%]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
  
            <button className="bg-[#8735C8] py-[1%] px-[5%] font-QMedium text-[12px] tracking-[2px] mb-[2%]  text-white">
              SIGN UP
            </button>
            <h4 className="text-[20px] max-[450px]:text-[15px] font-QMedium text-[#244262] cursor-pointer my-[3%]">
              Go to Login page
            </h4>
            <h4 className="text-[20px] max-[450px]:text-[15px] font-QMedium text-[#244262] ">
              Go to Home page
            </h4>
          </div>
        </div>
      </div>
    );
};

export default Signup;