import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  image:{
    type:String,
    require:true,
    trim:true,
  },
  bio:{
    type:String,
    require:true,
   
  },
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users',  unique:true, required: true },
 
  userName:{
    type:String,
    require:true,
  },
  
},
{
  timestamps:true
})



export default mongoose.model('profile',profileSchema)