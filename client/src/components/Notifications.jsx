import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import feed2 from "../images/IMG_8890.jpeg";
import user2 from "../images/IMG_6351.jpeg";

const Notification = ({ onDataSend}) => {
   const[hide,setHide]=useState(true)
   
   
  useEffect(()=>{
    onDataSend(hide)
  },[hide])
   
  return (
    <div className='dd fixed bottom-0 left-0 right-0 z-10 h-[600px] bg-[#FAFAFA] mx-[5%] overflow-y-scroll rounded-t-[20px] shadow-lg' >
        <div className='flex justify-between fixed w-[84%] text-[25px] mx-[3%] mb-[3%] z-[1] bg-[#FAFAFA] p-[3%] ' >
            <h1 className='w-full font-QSemi' >Notifications</h1>
            <FontAwesomeIcon onClick={()=>setHide(false)} className='absolute right-0 cursor-pointer' icon={faXmark} />
        </div>
        <div className='absolute top-[85px] w-full' >
        <div className='flex  items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[90%] flex justify-between  items-center' >
                <h2 className='font-QBold' >Shanib Jan started following you</h2>
                <button className="bg-[#8735C8] font-QSemi text-white px-[6%] py-[1%] rounded-[10px] shadow-md ">
                    Follow
                  </button>
                
            </div>
        </div>
        <div className='flex items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
           <div className='text-left w-[90%] flex justify-between  items-center' >
                <h2 className='font-QBold' >Shanib Jan liked your post</h2>
                <img className='w-[100px] object-cover aspect-square rounded-[10px]' src={feed2} alt="" />
               
            </div>
        </div>
        <div className='flex items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
           <div className='text-left w-[90%] flex justify-between  items-center' >
                <h2 className='font-QBold' >xavier_007 started following you</h2>
                <button className="bg-[#8735C8] font-QSemi text-white px-[6%] py-[1%] rounded-[10px] shadow-md ">
                    Follow
                  </button>
               
            </div>
        </div>
        <div className='flex items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >Shanib Jan liked your post</h2>
               
            </div>
        </div>
        <div className='flex items-center bg-white rounded-[20px] my-[3%] mx-[4%] p-[2%]' >
           <img className="h-[50px] w-[50px] object-cover rounded-[50%] mr-[3%]" src={user2} alt="" />
            <div className='text-left w-[70%]' >
                <h2 className='font-QBold' >xavier_007 liked your post</h2>

            </div>
        </div>
        </div>

       
        
        

    </div>
  );
};

export default Notification;