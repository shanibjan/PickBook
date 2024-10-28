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
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'profile', required: true },
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