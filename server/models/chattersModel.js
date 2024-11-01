// Chat Model (models/Chat.js)
import mongoose from "mongoose";

const chattersSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true,unique:true },
  receivers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'profile', required: true }] ,
 
  createdAt: {
    type: Date,
    default: Date.now,
   
  }
  
},{
    timestamps:true
  })




export default mongoose.model("chatters", chattersSchema);
