import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image:{
    type:String,
    require:true,
    trim:true,
  },

  userImage:{
    type:String,
    require:true,
    trim:true,
  },
  description:{
    type:String,
    require:true,
   
  },
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  userName:{
    type:String,
    require:true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the current date as the default value
  },
 
  
  
},
{
  timestamps:true
})



export default mongoose.model('post',postSchema)