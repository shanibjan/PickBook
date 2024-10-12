import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import user2 from "../images/IMG_6351.jpeg";

const Comments = ({ onDataSend}) => {
   const[hide,setHide]=useState(true)
   
   
  useEffect(()=>{
    onDataSend(hide)
  },[hide])
   
  return (
    <div className='dd fixed bottom-0 left-0 right-0 z-10 h-[600px] bg-[#FAFAFA] mx-[5%] overflow-y-scroll rounded-t-[20px] shadow-lg' >
        <div className='flex justify-between fixed w-[84%] text-[25px] mx-[3%] mb-[3%] z-[1] bg-[#FAFAFA] p-[3%] ' >
            <h1 className='w-full font-QSemi' >Comments</h1>
            <FontAwesomeIcon onClick={()=>setHide(false)} className='absolute right-0 cursor-pointer' icon={faXmark} />
        </div>
        <div className='absolute top-[85px] w-full' >
        <div className='flex bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >Shanib Jan</h2>
                <p className='font-QRegular' >wow...! nice picture,just loved it...!🤯</p>
            </div>
        </div>
        <div className='flex bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >Shanib Jan</h2>
                <p className='font-QRegular' >wow...! nice picture,just loved it...!🤯</p>
            </div>
        </div>
        <div className='flex bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >Shanib Jan</h2>
                <p className='font-QRegular' >wow...! nice picture,just loved it...!🤯</p>
            </div>
        </div>
        <div className='flex bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >Shanib Jan</h2>
                <p className='font-QRegular' >wow...! nice picture,just loved it...!🤯</p>
            </div>
        </div>
        <div className='flex bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >Shanib Jan</h2>
                <p className='font-QRegular' >wow...! nice picture,just loved it...!🤯</p>
            </div>
        </div>
        </div>

        <div className="flex fixed bottom-0 w-[84%] bg-white rounded-[20px] justify-between items-center mx-[3%] p-[2%]  ">
            <div className="h-[60px]">
              <img className="h-[50px] w-[50px] object-cover rounded-[50%]" src={user2} alt="" />
            </div>
            <input
              className="w-[88%] h-[50px] px-[3%] bg-gray-100 font-QRegular outline-none rounded-[20px]"
              type="text"
              placeholder="What do you want to share today..!"
            />
            <FontAwesomeIcon className='h-[25px] text-gray-500 cursor-pointer' icon={faPaperPlane} />
          </div>
        
        

    </div>
  );
};

export default Comments;