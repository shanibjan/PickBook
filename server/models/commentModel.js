import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userName:{
    type:String,
    require:true,
    trim:true,
  },

  userImage:{
    type:String,
    require:true,
    trim:true,
  },

  comment:{
    type:String,
    require:true,
    trim:true,
  },
  
  
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'profile'},
  
  createdAt: {
    type: Date,
    default: Date.now, // Set the current date as the default value
  },
 
  
  
},
{
  timestamps:true
})



export default mongoose.model('comment',commentSchema)