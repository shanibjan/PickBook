import { faBell, faMessage, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import user from "../images/user.png";

const Footer = () => {
  return (
    <div>
     <div className=" fixed bottom-0 w-full bg-white px-[5%] py-[2%] hidden max-[800px]:flex justify-between " >  
        <div className="h-[25px]" >
          <FontAwesomeIcon icon={faSquarePlus} className="w-full h-full" />
        </div>
        <div className="h-[25px]" >
          <FontAwesomeIcon icon={faMessage} className="w-full h-full" />
        </div>
        <div className="h-[25px]" >
          <FontAwesomeIcon icon={faBell} className="w-full h-full" />
        </div>
        <div className="h-[25px]" >
          <img className="h-full" src={user} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;