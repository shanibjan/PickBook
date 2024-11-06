import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => {
    toast.success("Success Notification!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#8735C8', color: 'white' },
        icon: '🚀',
      });
}

function Noti() {

   

      return (
        <div>
          <button onClick={notify}>Show Notification</button>
          <ToastContainer limit={1} />
        </div>
      );
}

export default Noti;